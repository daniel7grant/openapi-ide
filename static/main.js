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
        history.pushState({}, "", url);
    });

    window.editor = editor;
});
