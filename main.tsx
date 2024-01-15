/* @jsx jsx */
import { jsx, serveStatic } from '$hono/middleware.ts';
import { Hono } from '$hono/mod.ts';
import Layout from './layout.tsx';
import { findExampleCall } from './utils/openapi.ts';
import { convertApiToTypes, downloadApi } from './utils/openapi.ts';

const apis = [
    { name: 'Deno', url: 'https://api.deno.com/v1/openapi.json' },
    {
        name: 'Gitea',
        url: 'https://raw.githubusercontent.com/APIs-guru/openapi-directory/main/APIs/gitea.io/1.20.0%2Bdev-539-g5e389228f/openapi.yaml',
    },
];

const app = new Hono();

app.get('/main.js', async (c) => {
    const apiUrl = c.req.query('api') ?? apis[0].url;
    const spec = await downloadApi(apiUrl);
    const ts = await convertApiToTypes(spec);
    const [ns, operation, parameters] = findExampleCall(spec);

    return c.text(
        `monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
	target: monaco.languages.typescript.ScriptTarget.ES2015,
	allowNonTsExtensions: true,
	module: 99, // ESNext
	target: 99, // ESNext
});

const libSource = ${JSON.stringify(ts)};
const libUri = 'file:///api.ts';
monaco.editor.createModel(libSource, 'typescript', monaco.Uri.parse(libUri));

const model = monaco.editor.createModel([
		'import { Api } from "./api";',
		'',
		'const api = new Api();',
		'',
		'const result = await api.${ns}.${operation}(${parameters.join(', ')});',
	].join('\\n'), 'typescript', monaco.Uri.parse('file:///main.ts'));

const editor = monaco.editor.create(document.getElementById('container'), { model });`
    );
});

app.get('/', (c) => {
    const api = c.req.query('api');

    if (!api) {
        return c.redirect(`/?api=${encodeURIComponent(apis[0].url)}`);
    }

    return c.html(
        <Layout script={`./main.js?api=${encodeURIComponent(api)}`}>
            <form method="GET" style="height: 2rem">
                <select name="api">
                    {apis.map(({ name, url }) => (
                        <option value={url} selected={url === api}>
                            {name}
                        </option>
                    ))}
                </select>
                <button type="submit">Go</button>
            </form>
            <div id="container" style="width: 100%; height: calc(100vh - 2rem)"></div>
        </Layout>
    );
});

app.use('/static/*', serveStatic({ root: './' }));

Deno.serve(app.fetch);
