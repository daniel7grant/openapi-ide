import { Hono } from 'https://deno.land/x/hono@v3.12.3/mod.ts';
import { serveStatic } from 'https://deno.land/x/hono@v3.12.3/middleware.ts';
import { generateApi } from 'npm:swagger-typescript-api@13.0.3';
import * as YAML from 'https://deno.land/std@0.207.0/yaml/mod.ts';

const app = new Hono();

app.get('/main.js', async (c) => {
    const specReq = await fetch('https://raw.githubusercontent.com/APIs-guru/openapi-directory/main/APIs/gitea.io/1.20.0%2Bdev-539-g5e389228f/openapi.yaml');
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

    return c.text(`monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
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

const editor = monaco.editor.create(document.getElementById('container'), { model });`);
});

app.get('/', serveStatic({ path: './index.html' }));

Deno.serve(app.fetch);
