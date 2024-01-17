import { FC, html } from '$hono/middleware.ts';

const Layout: FC = ({ children }) => html`<!DOCTYPE html>
    <html>
        <head>
            <meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
            <link
                rel="stylesheet"
                data-name="vs/editor/editor.main"
                href="/static/monaco-editor/min/vs/editor/editor.main.css"
            />
            <link rel="stylesheet" type="text/css" href="/static/swagger-ui-dist/swagger-ui.css" />
        </head>

        <body style="margin: 0; height: 100vh">
            ${children}
            ${html`
                <script>
                    var require = { paths: { vs: '/static/monaco-editor/min/vs' } };
                </script>
            `}
            <script src="/static/swagger-ui-dist/swagger-ui-bundle.js" charset="UTF-8"></script>
            <script
                src="/static/swagger-ui-dist/swagger-ui-standalone-preset.js"
                charset="UTF-8"
            ></script>
            <script src="/static/monaco-editor/min/vs/loader.js"></script>
            <script src="/static/monaco-editor/min/vs/editor/editor.main.nls.js"></script>
            <script src="/static/monaco-editor/min/vs/editor/editor.main.js"></script>

            <script src="/static/main.js"></script>
        </body>
    </html> `;

export default Layout;
