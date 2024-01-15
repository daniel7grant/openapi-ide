/* @jsx jsx */
import { jsx, serveStatic } from '$hono/middleware.ts';
import { Hono } from '$hono/mod.ts';
import Layout from './layout.tsx';
import { makeDefaultContent } from './utils/openapi.ts';
import { convertApiToTypes, downloadApi } from './utils/openapi.ts';

const apis = [
    { name: 'Deno', url: 'https://api.deno.com/v1/openapi.json' },
    {
        name: 'Gitea',
        url: 'https://raw.githubusercontent.com/APIs-guru/openapi-directory/main/APIs/gitea.io/1.20.0%2Bdev-539-g5e389228f/openapi.yaml',
    },
];

const app = new Hono();

app.get('/editor', async (c) => {
    const apiUrl = c.req.query('api') ?? apis[0].url;
    const spec = await downloadApi(apiUrl);
    const ts = await convertApiToTypes(spec);

    return c.text(ts);
});

app.get('/', async (c) => {
    const apiUrl = c.req.query('api');
    const code = c.req.query('code');

    if (!apiUrl) {
        const defaultApiUrl = apis[0].url;
        return c.redirect(`/?api=${encodeURIComponent(defaultApiUrl)}`);
    }

    if (!code) {
        const spec = await downloadApi(apiUrl);
        const content = makeDefaultContent(spec);
        return c.redirect(
            `/?api=${encodeURIComponent(apiUrl)}&code=${encodeURIComponent(btoa(content))}`
        );
    }

    return c.html(
        <Layout>
            <form method="GET" style="height: 2rem">
                <select name="api">
                    {apis.map(({ name, url }) => (
                        <option value={url} selected={url === apiUrl}>
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
