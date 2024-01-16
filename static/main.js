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
        document.getElementById('message').innerText = 'Deploying to Deno Deploy...';
        try {
            const envs = getEnvs();
            const result = await fetch(`/run`, {
                method: 'post',
                body: JSON.stringify({
                    api: apiUrl,
                    code: btoa(editor.getValue()),
                    envs,
                }),
            }).then((p) => p.text());

            document.getElementById('message').innerText = result;
        } catch (err) {
            document.getElementById('message').innerText = err.message;
        } finally {
            editor.updateOptions({ readOnly: false });
        }
    });

    function getEnvs() {
        const envs = {};
        const envsElement = document.getElementById('envs');
        for (const child of envsElement.children) {
            const key = child.querySelector('.key')?.value;
            const value = child.querySelector('.value')?.value;
            if (key && value) {
                envs[key] = value;
            }
        }
        return envs;
    }

    function loadFromStorage() {
        const envsStr = localStorage.getItem('envs');
        if (envsStr) {
            const envs = JSON.parse(envsStr);

            const envsElement = document.getElementById('envs');
            const envContent = Object.entries(envs).map(([key, value]) => {
                return `<div style="display: flex">
					<input class="key" type="text" placeholder="Env key" value="${key}" />
					<input class="value" type="text" placeholder="Env value" value="${value}" />
				</div>`;
            }).join('\n');

			envsElement.innerHTML = envContent;
        }
    }

	function saveToStorage() {
		const envs = getEnvs();
		localStorage.setItem('envs', JSON.stringify(envs));
	}

    function onInputChange() {
        const envsElement = document.getElementById('envs');
        const lastBlock = envsElement.children[envsElement.children.length - 1];
        const inputs = lastBlock.querySelectorAll('input');
        if ([...inputs].some((i) => i.value !== '')) {
            const copy = lastBlock.cloneNode(true);
            copy.querySelectorAll('input').forEach((el) => {
                el.value = '';
                el.addEventListener('input', onInputChange);
            });
            envsElement.appendChild(copy);
        }
		saveToStorage();
    }

    document.querySelectorAll('#envs input').forEach((element) => {
        element.addEventListener('input', onInputChange);
    });

	loadFromStorage();
    onInputChange();
});
