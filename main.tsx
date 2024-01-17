/// <reference lib="deno.unstable" />
/* @jsx jsx */
import { jsx, serveStatic } from '$hono/middleware.ts';
import { Hono } from '$hono/mod.ts';
import Layout from './layout.tsx';
import { makeDefaultContent } from './utils/openapi.ts';
import { convertApiToTypes, downloadApiWithCache } from './utils/openapi.ts';
import { run } from './utils/subhosting.ts';

const apis = [
    { name: 'Deno', url: 'https://api.deno.com/v1/openapi.json' },
    {
        name: 'Gitea',
        url: 'https://raw.githubusercontent.com/APIs-guru/openapi-directory/main/APIs/gitea.io/1.20.0%2Bdev-539-g5e389228f/openapi.yaml',
    },
];

const apiCache = await Deno.openKv();

const app = new Hono();

app.post('/run', async (c) => {
    const {
        code,
        api = apis[0].url,
        envs = {},
    } = await c.req.json<{
        api?: string;
        code?: string;
        envs?: Record<string, string>;
    }>();

    const spec = await downloadApiWithCache(apiCache, api);
    const apiCode = await convertApiToTypes(spec);

    if (!code) {
        return c.status(400);
    }

    try {
        const results = await run(atob(code), apiCode, envs);
        return c.text(results);
    } catch (err) {
        if (err instanceof Error) {
            return c.text(err.message, { status: 400 });
        } else {
            return c.text('Unknown error happened.', { status: 500 });
        }
    }
});

app.get('/editor', async (c) => {
    const apiUrl = c.req.query('api') ?? apis[0].url;
    const spec = await downloadApiWithCache(apiCache, apiUrl);
    const apiCode = await convertApiToTypes(spec);

    return c.text(apiCode);
});

app.get('/', async (c) => {
    const apiUrl = c.req.query('api');
    const code = c.req.query('code');

    if (!apiUrl) {
        const defaultApiUrl = apis[0].url;
        return c.redirect(`/?api=${encodeURIComponent(defaultApiUrl)}`);
    }

    if (!code) {
        const spec = await downloadApiWithCache(apiCache, apiUrl);
        const content = makeDefaultContent(spec);
        return c.redirect(
            `/?api=${encodeURIComponent(apiUrl)}&code=${encodeURIComponent(btoa(content))}`
        );
    }

    return c.html(
        <Layout>
            <div style="display: flex;">
                <div style="width: 50%;">
                    <div style="display: flex; height: 2rem; gap: 0.5rem;">
                        <form method="GET">
                            <select name="api">
                                {apis.map(({ name, url }) => (
                                    <option value={url} selected={url === apiUrl}>
                                        {name}
                                    </option>
                                ))}
                            </select>
                            <button type="submit">Go</button>
                        </form>
                    </div>
                    <div id="container" style="width: 100%; height: calc(50vh - 2rem)"></div>
                    <div>
                        <div style="display: flex; align-items: center; height: 2rem; gap: 0.5rem;">
                            <button id="run-button" type="button">
                                Run
                            </button>
                        </div>
                        <div id="envs">
                            <div style="display: flex">
                                <input class="key" type="text" placeholder="Env key" />
                                <input class="value" type="text" placeholder="Env value" />
                            </div>
                        </div>
                        <pre id="message" style="white-space: pre-wrap; word-wrap: anywhere;"></pre>
                    </div>
                </div>
                <div style="width: 50%; height: 100vh; overflow-y: scroll;">
					<div id="swagger-ui"></div>
				</div>
            </div>
        </Layout>
    );
});

app.use('/static/*', serveStatic({ root: './' }));

Deno.serve(app.fetch);
