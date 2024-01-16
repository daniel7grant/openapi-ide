const accessToken = Deno.env.get('DEPLOY_ACCESS_TOKEN')!;
if (!accessToken) {
    throw new Error('DEPLOY_ACCESS_TOKEN is not passed. Set it in the .env file.');
}

const orgId = Deno.env.get('DEPLOY_ORG_ID')!;
if (!orgId) {
    throw new Error('DEPLOY_ORG_ID is not passed. Set it in the .env file.');
}

export { accessToken, orgId };
