import { FC, html } from '$hono/middleware.ts';

interface LayoutProps {
    script: string;
}

const Layout: FC<LayoutProps> = ({ children, script }) => html`<!DOCTYPE html>
    <html>
        <head>
            <meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
            <link
                rel="stylesheet"
                data-name="vs/editor/editor.main"
                href="/static/monaco-editor/min/vs/editor/editor.main.css"
            />
        </head>

        <body style="margin: 0">
            ${children}
            ${html`
                <script>
                    var require = { paths: { vs: '/static/monaco-editor/min/vs' } };
                </script>
            `}
            <script src="/static/monaco-editor/min/vs/loader.js"></script>
            <script src="/static/monaco-editor/min/vs/editor/editor.main.nls.js"></script>
            <script src="/static/monaco-editor/min/vs/editor/editor.main.js"></script>

            <script src="${script}"></script>
        </body>
    </html> `;

export default Layout;
