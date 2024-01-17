const accessToken = Deno.env.get('DEPLOY_ACCESS_TOKEN') ?? '';
const orgId = Deno.env.get('DEPLOY_ORG_ID') ?? '';

if (!orgId || !accessToken) {
    console.warn('DEPLOY_ACCESS_TOKEN or DEPLOY_ORG_ID is not passed. Set it in the .env file.');
}

export { accessToken, orgId };
