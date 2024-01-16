import { accessToken, orgId } from './config.ts';
import { ContentType, Project } from './deno-api.ts';
import { Api } from './deno-api.ts';

const api = new Api({
    securityWorker: (param: string | null) => ({
        headers: { Authorization: param ? `Bearer ${param}` : '' },
    }),
});
api.setSecurityData(accessToken);

let project: Project | undefined = undefined;
export async function initProject(): Promise<Project> {
    if (project) {
        return project;
    }

    const projectName = 'subhostingdemo';
    const projects = await api.organizations.listProjects(
        orgId,
        { q: projectName },
        { type: ContentType.Json, format: 'json' }
    );

    if (projects && projects.length > 0) {
        project = projects[0];
    } else {
        project = await api.organizations.createProject(orgId, { name: projectName });
    }
    return project;
}

export async function run(
    code: string,
    apiCode: string,
    envVars: Record<string, string> = {}
): Promise<string> {
    const lines = code.split('\n').map((line) => line.trim());
    const imports = lines.filter((line) => line.startsWith('import '));
    const rest = lines.filter((line) => !line.startsWith('import '));

	// Please add a script API, I'm begging you
    const serverFile = `${imports.join('\n').replaceAll(/from "\.\/api"/g, 'from "./api.ts"')}

	let lines = [], error = false;
	console.log = (line) => lines.push(line);
	console.error = (line) => { lines.push(line); error = true; };
	
	try {
		${rest.join('\n')};
	} catch (err) {
		console.error(err);
	}

	Deno.serve({ onListen: () => {} }, async () => {
		return new Response(
			lines.map(
				line => JSON.stringify(line)
			).join("\\n")
		);
	});`;

    const project = await initProject();
    let deployment = await api.projects.createDeployment(
        project.id,
        {
            entryPointUrl: 'main.ts',
            assets: {
                'main.ts': {
                    kind: 'file',
                    content: serverFile,
                },
                'api.ts': {
                    kind: 'file',
                    content: apiCode,
                },
            },
            envVars: envVars,
        },
        { type: ContentType.Json, format: 'json' }
    );

    while (deployment.status === 'pending') {
        deployment = await api.deployments.getDeployment(deployment.id, {
            type: ContentType.Json,
            format: 'json',
        });
        await new Promise((resolve) => setTimeout(resolve, 200));
    }

    if (!deployment.domains?.[0]) {
        throw new Error("Deploying code failed, you probably have a syntax error somewhere.");
    }
    const logsReq = await fetch(`https://${deployment.domains[0]}`);
	if (logsReq.status > 400) {
		throw new Error(`Request failed: ${await logsReq.text()}`);
	}
    return logsReq.text();
}
