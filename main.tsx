/* @jsx jsx */
import { jsx, serveStatic } from '$hono/middleware.ts';
import { Hono } from '$hono/mod.ts';
import { generateApi } from 'npm:swagger-typescript-api@13.0.3';
import * as YAML from '$yaml/mod.ts';
import Layout from './layout.tsx';

const app = new Hono();

app.get('/main.js', async (c) => {
    const specReq = await fetch(
        'https://raw.githubusercontent.com/APIs-guru/openapi-directory/main/APIs/gitea.io/1.20.0%2Bdev-539-g5e389228f/openapi.yaml'
    );
    const specText = await specReq.text();

    let spec;
    if (specText.startsWith('{')) {
        spec = JSON.parse(specText);
    } else {
        spec = YAML.parse(specText);
    }

    const api = await generateApi({
        spec,
        output: './',
        name: 'Api',
        extractEnums: true,
        extractRequestBody: true,
        extractResponseBody: true,
        silent: true,
        unwrapResponseData: true,
    });

    return c.text(
        `monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
	target: monaco.languages.typescript.ScriptTarget.ES2015,
	allowNonTsExtensions: true,
	module: 99, // ESNext
	target: 99, // ESNext
});

const libSource = ${JSON.stringify(api.files[0].fileContent)};
const libUri = 'file:///api.ts';
monaco.editor.createModel(libSource, 'typescript', monaco.Uri.parse(libUri));

const model = monaco.editor.createModel([
		'import { Api } from "./api";',
		'',
		'const api = new Api();',
		'',
		'const d = await api.domains.getDomain("");',
	].join('\\n'), 'typescript', monaco.Uri.parse('file:///main.ts'));

const editor = monaco.editor.create(document.getElementById('container'), { model });`,
        200,
        {
            'Content-Type': 'text/javascript',
        }
    );
});

app.get('/', (c) => {
    return c.html(
        <Layout script="./main.js">
            <h2>Monaco Editor Sync Loading Sample</h2>
            <div id="container" style="width: 800px; height: 600px; border: 1px solid grey"></div>
        </Layout>
    );
});

app.use('/static/*', serveStatic({ root: './' }));

Deno.serve(app.fetch);
