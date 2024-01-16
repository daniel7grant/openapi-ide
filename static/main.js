addEventListener('DOMContentLoaded', async () => {
    const { searchParams } = new URL(location);
    const apiUrl = searchParams.get('api');
    const code = atob(searchParams.get('code'));

    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
        allowNonTsExtensions: true,
        module: monaco.languages.typescript.ModuleKind.ESNext,
        target: monaco.languages.typescript.ScriptTarget.ESNext,
    });

    const libSource = await fetch(`/editor?api=${encodeURIComponent(apiUrl)}`).then((p) =>
        p.text()
    );
    const libUri = 'file:///api.ts';
    monaco.editor.createModel(libSource, 'typescript', monaco.Uri.parse(libUri));

    const model = monaco.editor.createModel(
        code,
        'typescript',
        monaco.Uri.parse('file:///main.ts')
    );

    const editor = monaco.editor.create(document.getElementById('container'), { model });
    editor.onDidChangeModelContent(() => {
        const url = new URL(location);
        url.searchParams.set('code', btoa(editor.getValue()));
        history.pushState({}, '', url);
    });

    document.getElementById('run-button').addEventListener('click', async () => {
        editor.updateOptions({ readOnly: true });
		document.getElementById('status').innerText = 'Deploying to Deno Deploy...';
        try {
            const result = await fetch(
                `/run?api=${encodeURIComponent(apiUrl)}&code=${btoa(editor.getValue())}`,
                {
                    method: 'post',
                }
            ).then((p) => p.text());
            
            document.getElementById('message').innerText = result;
        } catch (err) {
            document.getElementById('message').innerText = err.message;
        } finally {
			document.getElementById('status').innerText = '';
            editor.updateOptions({ readOnly: false });
        }
    });
});
