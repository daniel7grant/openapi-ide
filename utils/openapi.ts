import * as YAML from '$yaml/mod.ts';
import { generateApi } from 'swagger-typescript-api';
import { OpenAPIV3_1 } from 'openapi-types';
import { toCamelCase } from './utils.ts';

export type Spec = OpenAPIV3_1.Document;

const defaultForParam = (param: OpenAPIV3_1.ParameterObject): string => {
    if (param.example) {
        return param.example;
    }
    if (!param.schema || '$ref' in param.schema) {
        return '""';
    }
    switch (param.schema.type) {
        case 'string':
            return '""';
        case 'integer':
        case 'number':
            return '0';
        case 'boolean':
            return 'true';
        case 'object':
            return '{}';
        case 'array':
            return '[]';
        default:
            return '""';
    }
};

export async function downloadApiWithCache(cache: Deno.Kv, url: string): Promise<Spec> {
    const cachedSpec = await cache.get<Spec>([url]);
    if (!cachedSpec.value) {
        const spec = await downloadApi(url);
        try {
            await cache.set([url], spec);
        } catch {
            // caching failed
        }
        return spec;
    }
    return cachedSpec.value;
}

export async function downloadApi(url: string): Promise<Spec> {
    const specReq = await fetch(url);
    const specText = await specReq.text();

    const spec = (specText.startsWith('{') ? JSON : YAML).parse(specText);
    return spec;
}

export async function convertApiToTypes(spec: any): Promise<string> {
    const api = await generateApi({
        spec: spec,
        output: false,
        name: 'Api',
        extractEnums: true,
        extractRequestBody: true,
        extractResponseBody: true,
        silent: true,
        unwrapResponseData: true,
        generateUnionEnums: true,
    });

    return api.files[0].fileContent;
}

export function makeDefaultContent(spec: Spec): string {
    const operations = Object.entries(spec.paths ?? {}).flatMap(([path, methods = {}]) =>
        Object.entries(methods).map(
            ([method, operation]) =>
                [method, path, operation] as [string, string, OpenAPIV3_1.OperationObject]
        )
    );

    const exampleCall = operations
        .filter(
            ([, , operation]) =>
                operation.requestBody === undefined && operation.operationId !== undefined
        )
        .toSorted(
            ([, , op1], [, , op2]) => (op1.parameters ?? []).length - (op2.parameters ?? []).length
        );

    const ns = exampleCall[0][1].split('/')[1];
    const operation = toCamelCase(exampleCall[0][2].operationId ?? 'callExample');
    const parameters = (exampleCall[0][2].parameters ?? []).map((param) =>
        !('$ref' in param) ? defaultForParam(param) : '""'
    );

    const defaultCode = [
        'import { Api } from "./api";',
        '',
        'const api = new Api();',
        '',
        `const result = await api.${ns}.${operation}(${parameters.join(',')});`,
        '',
    ].join('\n');

    return defaultCode;
}
