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

    console.log(projects);

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
    const project = await initProject();
    const deployment = await api.projects.createDeployment(
        project.id,
        {
            entryPointUrl: 'main.ts',
            assets: {
                'main.ts': {
                    kind: 'file',
                    content: 'console.log("hello")',
                },
                // 'api.ts': {
                //     kind: 'file',
                //     content: apiCode,
                // },
            },
            envVars: envVars,
        },
        { type: ContentType.Json, format: 'json' }
    );

    const logs = await api.deployments.getBuildLogs(deployment.id, {
        type: ContentType.Json,
        format: 'json',
    });

    return logs as any;
}
