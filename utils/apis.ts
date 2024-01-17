export type Api = {
    name: string;
    url: string;
    example?: string;
};

export const apis: Api[] = [
    { name: 'Deno', url: 'https://api.deno.com/v1/openapi.json', example: `import { Api } from "./api";

const DEPLOY_ACCESS_TOKEN = Deno.env.get("DEPLOY_ACCESS_TOKEN");
const DEPLOY_ORG_ID = Deno.env.get("DEPLOY_ORG_ID");

const api = new Api({
	baseApiParams: {
		headers: {
			Authorization: \`Bearer \${DEPLOY_ACCESS_TOKEN}\`
		}
	}
});

const projects = await api.organizations.listProjects(
	DEPLOY_ORG_ID,
	{ limit: 5 },
	{ format: 'json' }
);

console.log(projects);` },
    {
        name: 'GitHub',
        url: 'https://raw.githubusercontent.com/github/rest-api-description/main/descriptions/api.github.com/api.github.com.yaml',
    },
];
