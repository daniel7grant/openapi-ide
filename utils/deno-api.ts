/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface AddDomainCertificateRequest {
    /**
     * The PEM encoded private key for the TLS certificate
     * @example "-----BEGIN EC PRIVATE KEY-----
     * foobar
     * -----END EC PRIVATE KEY-----
     * "
     */
    privateKey: string;
    /**
     * The PRM encoded certificate chain for the TLS certificate
     * @example "-----BEGIN CERTIFICATE-----
     * foobar
     * -----END CERTIFICATE-----
     * "
     */
    certificateChain: string;
}

/**
 * Project analytics data
 * @example {"fields":[{"name":"time","type":"time"},{"name":"requestCount","type":"number"},{"name":"cpuSeconds","type":"number"},{"name":"uptimeSeconds","type":"number"},{"name":"maxRssMemoryBytes","type":"number"},{"name":"networkIngressBytes","type":"number"},{"name":"networkEgressBytes","type":"number"},{"name":"kvReadCount","type":"number"},{"name":"kvWriteCount","type":"number"},{"name":"kvReadUnits","type":"number"},{"name":"kvWriteUnits","type":"number"},{"name":"kvStorageBytes","type":"number"}],"values":[["2023-08-01T00:00:00Z",111,111,111,111,111,111,111,111,111,111,111],["2023-08-01T00:15:00Z",222,222,222,222,222,222,222,222,222,222,222],["2023-08-01T00:30:00Z",333,333,333,333,333,333,333,333,333,333,333],["2023-08-01T00:45:00Z",444,444,444,444,444,444,444,444,444,444,444],["2023-08-01T01:00:00Z",555,555,555,555,555,555,555,555,555,555,555]]}
 */
export interface Analytics {
    fields: AnalyticsFieldSchema[];
    values: AnalyticsDataValue[][];
}

export type AnalyticsDataValue = string | number | boolean;

export interface AnalyticsFieldSchema {
    name: string;
    /**
     * A data type that analytic data can be represented in.
     *
     * Inspired by Grafana's data types defined at:
     * https://github.com/grafana/grafana/blob/e3288834b37b9aac10c1f43f0e621b35874c1f8a/packages/grafana-data/src/types/dataFrame.ts#L11-L23
     */
    type: AnalyticsFieldType;
}

/**
 * A data type that analytic data can be represented in.
 *
 * Inspired by Grafana's data types defined at:
 * https://github.com/grafana/grafana/blob/e3288834b37b9aac10c1f43f0e621b35874c1f8a/packages/grafana-data/src/types/dataFrame.ts#L11-L23
 */
export type AnalyticsFieldType = 'time' | 'number' | 'string' | 'boolean' | 'other';

export interface AppLogsResponseEntry {
    /**
     * Log timestamp
     * @format date-time
     * @example "2021-08-01T00:00:00Z"
     */
    time: string;
    level: LogLevel;
    /** @example "log message" */
    message: string;
    region: Region;
}

export type Asset =
    | (File & {
          kind: AssetKindEnum;
      })
    | (Symlink & {
          kind: AssetKindEnum1;
      });

/**
 * A map whose key represents a file path, and the value is an asset that
 * composes the deployment.
 *
 * Each asset is one of the following three kinds:
 *
 * 1. A file with content data (which is UTF-8 for text, or base64 for binary)
 * 2. A file with a hash
 * 3. A symbolic link to another asset
 *
 * Assets that were uploaded in some of the previous deployments don't need to
 * be uploaded again. In this case, in order to identify the asset, just
 * provide the SHA-1 hash of the content.
 */
export type Assets = Record<string, Asset>;

export interface BuildLogsResponseEntry {
    /** @example "info" */
    level: string;
    /** @example "Downloaded https://deno.land/std@0.202.0/testing/asserts.ts (2/3)" */
    message: string;
}

/**
 * Compiler options to be used when building the deployment.
 *
 * If `null` is given, Deno's config file (i.e. `deno.json` or `deno.jsonc`)
 * will be auto-discovered, which may contain a `compilerOptions` field. If
 * found, that compiler options will be applied.
 *
 * If an empty object `{}` is given, [the default compiler options](https://docs.deno.com/runtime/manual/advanced/typescript/configuration#how-deno-uses-a-configuration-file)
 * will be applied.
 */
export interface CompilerOptions {
    jsx?: string | null;
    jsxFactory?: string | null;
    jsxFragmentFactory?: string | null;
    jsxImportSource?: string | null;
}

/** @example {"entryPointUrl":"main.ts","importMapUrl":null,"lockFileUrl":null,"compilerOptions":null,"assets":{"main.ts":{"kind":"file","content":"Deno.serve((req: Request) => new Response(\"Hello World\"));\n","encoding":"utf-8"},"images/cat1.png":{"kind":"file","content":"iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk","encoding":"base64"},"images/cat2.png":{"kind":"file","gitSha1":"5c4f8729e5c30a91a890e24d7285e89f418c637b"},"symlink.png":{"kind":"symlink","target":"images/cat1.png"}},"envVars":{"MY_ENV":"hey"},"databases":{"default":"5b484959-cba2-482d-95ab-ba592784af80"},"description":"My first deployment"} */
export interface CreateDeploymentRequest {
    /**
     * An URL of the entry point of the application.
     * This is the file that will be executed when the deployment is invoked.
     */
    entryPointUrl: string;
    /**
     * An URL of the import map file.
     *
     * If `null` is given, import map auto-discovery logic will be performed,
     * where it looks for Deno's config file (i.e. `deno.json` or `deno.jsonc`)
     * which may contain an embedded import map or a path to an import map file.
     * If found, that import map will be used.
     *
     * If an empty string is given, no import map will be used.
     */
    importMapUrl?: string | null;
    /**
     * An URL of the lock file.
     *
     * If `null` is given, lock file auto-discovery logic will be performed,
     * where it looks for Deno's config file (i.e. `deno.json` or `deno.jsonc`)
     * which may contain a path to a lock file or boolean value, such as `"lock":
     * false` or `"lock": "my-lock.lock"`. If a config file is found, the
     * semantics of the lock field is the same as the Deno CLI, so refer to [the
     * CLI doc page](https://docs.deno.com/runtime/manual/basics/modules/integrity_checking#auto-generated-lockfile).
     *
     * If an empty string is given, no lock file will be used.
     */
    lockFileUrl?: string | null;
    compilerOptions?: CompilerOptions | null;
    /**
     * A map whose key represents a file path, and the value is an asset that
     * composes the deployment.
     *
     * Each asset is one of the following three kinds:
     *
     * 1. A file with content data (which is UTF-8 for text, or base64 for binary)
     * 2. A file with a hash
     * 3. A symbolic link to another asset
     *
     * Assets that were uploaded in some of the previous deployments don't need to
     * be uploaded again. In this case, in order to identify the asset, just
     * provide the SHA-1 hash of the content.
     */
    assets: Assets;
    /**
     * A dictionary of environment variables to be set in the runtime environment
     * of the deployment.
     */
    envVars: Record<string, string>;
    /**
     * KV database ID mappings to associate with the deployment.
     *
     * A key represents a KV database name (e.g. `"default"`), and a value is a
     * KV database ID.
     *
     * Currently, only `"default"` database is supported. If any other database
     * name is specified, that will be rejected.
     *
     * If not provided, the deployment will be created with no KV database
     * attached.
     */
    databases?: Record<string, string>;
    /**
     * A description of the created deployment. If not provided, an empty string
     * will be set.
     * @maxLength 1000
     */
    description?: string | null;
}

export interface CreateDomainRequest {
    /** @example "foo.example.com" */
    domain: string;
}

export interface CreateKvDatabaseRequest {
    /**
     * The description of the KV database. If this is `null`, an empty string
     * will be set.
     * @maxLength 1000
     * @example "My KV database"
     */
    description?: string | null;
}

export interface CreateProjectRequest {
    /**
     * The name of the project. This must be globally unique. If this is `null`,
     * a random unique name will be generated.
     * @example "my-project"
     */
    name?: string | null;
    /**
     * The description of the project. If this is `null`, an empty string will be
     * set.
     * @maxLength 1000
     * @example "This is my project."
     */
    description?: string | null;
}

/**
 * Pagination links.
 * This header provides a URL for the `next` page.
 * The format conforms to [RFC 8288](https://tools.ietf.org/html/rfc8288).
 * @example "<https://api.deno.com/v1/endpoint?cursor=5pkjgv5462a>; rel="next""
 */
export type CursorLinkHeader = string;

export interface Deployment {
    /**
     * A deployment ID
     *
     * Note that this is not UUID v4, as opposed to organization ID and project ID.
     */
    id: DeploymentId;
    /**
     * @format uuid
     * @example "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11"
     */
    projectId: string;
    /**
     * The description of this deployment. This is present only when the `status`
     * is `success`.
     * @example "My deployment"
     */
    description?: string | null;
    /** The status of a deployment. */
    status: DeploymentStatus;
    /** @example ["example.com"] */
    domains?: string[] | null;
    /**
     * The KV databases that this deployment has access to.
     * Currently, only `"default"` database is supported.
     * @example {"default":"5b484959-cba2-482d-95ab-ba592784af80"}
     */
    databases: Record<string, string>;
    /**
     * @format date-time
     * @example "2021-08-01T00:00:00Z"
     */
    createdAt: string;
    /**
     * @format date-time
     * @example "2021-08-01T00:00:00Z"
     */
    updatedAt: string;
}

/**
 * A deployment ID
 *
 * Note that this is not UUID v4, as opposed to organization ID and project ID.
 * @example "abcde12vwxyz"
 */
export type DeploymentId = string;

/**
 * The status of a deployment.
 * @example "success"
 */
export type DeploymentStatus = 'failed' | 'pending' | 'success';

export interface DnsRecord {
    /** @example "A" */
    type: string;
    /** @example "deploy-sample" */
    name: string;
    /** @example "127.0.0.1" */
    content: string;
}

export interface Domain {
    /**
     * The ID of the domain.
     * @format uuid
     */
    id: string;
    /**
     * The ID of the organization that the domain is associated with.
     * @format uuid
     */
    organizationId: string;
    /**
     * The domain value.
     * @example "example.com"
     */
    domain: string;
    /** @example "b7e28147130005f5593d09e6" */
    token: string;
    /** Whether the domain's ownership is validated or not. */
    isValidated: boolean;
    /** TLS certificates for the domain. */
    certificates: DomainCertificate[];
    provisioningStatus: ProvisioningStatus;
    /**
     * The ID of the project that the domain is associated with.
     *
     * If the domain is not associated with any project, this field is omitted.
     * @format uuid
     */
    projectId?: string | null;
    deploymentId?: DeploymentId | null;
    /**
     * @format date-time
     * @example "2021-08-01T00:00:00Z"
     */
    createdAt: string;
    /**
     * @format date-time
     * @example "2021-08-01T00:00:00Z"
     */
    updatedAt: string;
    /** These records are used to verify the ownership of the domain. */
    dnsRecords: DnsRecord[];
}

export interface DomainCertificate {
    cipher: TlsCipher;
    /**
     * @format date-time
     * @example "2021-08-01T00:00:00Z"
     */
    expiresAt: string;
    /**
     * @format date-time
     * @example "2021-08-01T00:00:00Z"
     */
    createdAt: string;
    /**
     * @format date-time
     * @example "2021-08-01T00:00:00Z"
     */
    updatedAt: string;
}

export type Encoding = 'utf-8' | 'base64';

export interface ErrorBody {
    /** The error code */
    code: string;
    /** The error message */
    message: string;
}

export type File =
    | {
          content: string;
          encoding?: Encoding;
      }
    | {
          gitSha1: string;
      };

export interface KvDatabase {
    /**
     * A KV database ID
     * @format uuid
     */
    id: string;
    /**
     * An organization ID that this KV database belongs to
     * @format uuid
     */
    organizationId: string;
    /** A description of this KV database */
    description: string;
    /**
     * @format date-time
     * @example "2021-08-01T00:00:00Z"
     */
    updatedAt: string;
    /**
     * @format date-time
     * @example "2021-08-01T00:00:00Z"
     */
    createdAt: string;
}

export type LogLevel = 'error' | 'warning' | 'info' | 'debug';

/** @example {"id":"a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11","name":"my-org","createdAt":"2021-08-01T00:00:00Z","updatedAt":"2021-08-01T00:00:00Z"} */
export interface Organization {
    /** @format uuid */
    id: string;
    name: string;
    /** @format date-time */
    createdAt: string;
    /** @format date-time */
    updatedAt: string;
}

/**
 * Pagination links.
 * This header provides URLS for the `prev`, `next`, `first`, and `last` pages.
 * The format conforms to [RFC 8288](https://tools.ietf.org/html/rfc8288).
 * @example "<https://api.deno.com/v1/endpoint?page=3>; rel="next", <https://api.deno.com/v1/endpoint?page=1>; rel="prev", <https://api.deno.com/v1/endpoint?page=1>; rel="first", <https://api.deno.com/v1/endpoint?page=50>; rel="last""
 */
export type PaginationLinkHeader = string;

export interface Project {
    /**
     * @format uuid
     * @example "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11"
     */
    id: string;
    /** @example "my-project" */
    name: string;
    /**
     * @maxLength 1000
     * @example "this is my project."
     */
    description: string;
    /**
     * @format date-time
     * @example "2021-08-01T00:00:00Z"
     */
    createdAt: string;
    /**
     * @format date-time
     * @example "2021-08-01T00:00:00Z"
     */
    updatedAt: string;
}

export type ProvisioningStatus =
    | {
          code: ProvisioningStatusCodeEnum;
      }
    | {
          message: string;
          code: ProvisioningStatusCodeEnum1;
      }
    | {
          code: ProvisioningStatusCodeEnum2;
      }
    | {
          code: ProvisioningStatusCodeEnum3;
      };

export interface RedeployRequest {
    /**
     * A dictionary of environment variables to be set in the runtime environment
     * of the deployment.
     *
     * The provided environment variables will be _merged_ with the existing one.
     * For example, if the existing environment variables are:
     *
     * ```json
     * {
     * "a": "alice",
     * "b": "bob"
     * "c": "charlie"
     * }
     * ```
     *
     * and you pass the following environment variables in your redeploy request:
     *
     * ```json
     * {
     * "a": "alice2",
     * "b": null,
     * "d": "david"
     * }
     * ```
     *
     * then the result will be:
     *
     * ```json
     * {
     * "a": "alice2",
     * "c": "charlie",
     * "d": "david"
     * }
     * ```
     *
     * If `env_vars` itself is not provided, no update will happen to the
     * existing environment variables.
     * @example {"MY_ENV":"hey","ENV_TO_BE_DELETED":null}
     */
    env_vars?: Record<string, string | null>;
    /**
     * KV database ID mappings to associate with the deployment.
     *
     * A key represents a KV database name (e.g. `"default"`), and a value is a
     * KV database ID.
     *
     * Currently, only `"default"` database is supported. If any other database
     * name is specified, that will be rejected.
     *
     * The provided KV database mappings will be _merged_ with the existing one,
     * just like `env_vars`.
     *
     * If `databases` itself is not provided, no update will happen to the
     * existing KV database mappings.
     * @example {"default":"a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11"}
     */
    databases?: Record<string, string | null>;
    /**
     * A description of the created deployment. If not provided, no update will
     * happen to the description.
     * @example "Updated description"
     */
    description?: string | null;
}

export type Region =
    | 'gcp-asia-east1'
    | 'gcp-asia-east2'
    | 'gcp-asia-northeast1'
    | 'gcp-asia-northeast2'
    | 'gcp-asia-northeast3'
    | 'gcp-asia-south1'
    | 'gcp-asia-south2'
    | 'gcp-asia-southeast1'
    | 'gcp-asia-southeast2'
    | 'gcp-australia-southeast1'
    | 'gcp-australia-southeast2'
    | 'gcp-europe-central2'
    | 'gcp-europe-north1'
    | 'gcp-europe-southwest1'
    | 'gcp-europe-west1'
    | 'gcp-europe-west2'
    | 'gcp-europe-west3'
    | 'gcp-europe-west4'
    | 'gcp-europe-west6'
    | 'gcp-europe-west8'
    | 'gcp-me-west1'
    | 'gcp-northamerica-northeast1'
    | 'gcp-northamerica-northeast2'
    | 'gcp-southamerica-east1'
    | 'gcp-southamerica-west1'
    | 'gcp-us-central1'
    | 'gcp-us-east1'
    | 'gcp-us-east4'
    | 'gcp-us-east5'
    | 'gcp-us-south1'
    | 'gcp-us-west1'
    | 'gcp-us-west2'
    | 'gcp-us-west3'
    | 'gcp-us-west4';

export interface Symlink {
    target: string;
}

export type TlsCipher = 'rsa' | 'ec';

export interface UpdateDomainAssociationRequest {
    deploymentId?: DeploymentId | null;
}

export interface UpdateKvDatabaseRequest {
    /**
     * The description of the KV database to be updated to. If this is `null`, no
     * update will be made to the KV database description.
     * @maxLength 1000
     * @example "My KV database"
     */
    description?: string | null;
}

export interface UpdateProjectRequest {
    /**
     * The name of the project to be updated to. This must be globally unique.
     * If this is `null`, no update will be made to the project name.
     * @example "my-project2"
     */
    name?: string | null;
    /**
     * The description of the project to be updated to. If this is `null`, no
     * update will be made to the project description.
     * @maxLength 1000
     * @example "This is my project2."
     */
    description?: string | null;
}

export type GetOrganizationData = Organization;

export type GetOrganizationError = ErrorBody;

export type GetOrganizationAnalyticsData = Analytics;

export type GetOrganizationAnalyticsError = ErrorBody;

export type ListProjectsData = Project[];

export type ListProjectsError = ErrorBody;

export type CreateProjectData = Project;

export type CreateProjectError = ErrorBody;

export type ListKvDatabasesData = KvDatabase[];

export type ListKvDatabasesError = ErrorBody;

export type CreateKvDatabaseData = KvDatabase;

export type CreateKvDatabaseError = ErrorBody;

export type UpdateKvDatabaseData = KvDatabase;

export type UpdateKvDatabaseError = ErrorBody;

export type GetProjectData = Project;

export type GetProjectError = ErrorBody;

export type UpdateProjectData = Project;

export type UpdateProjectError = ErrorBody;

export type DeleteProjectData = any;

export type DeleteProjectError = ErrorBody;

export type GetProjectAnalyticsData = Analytics;

export type GetProjectAnalyticsError = ErrorBody;

export type ListDeploymentsData = Deployment[];

export type ListDeploymentsError = ErrorBody;

export type CreateDeploymentData = Deployment;

export type CreateDeploymentError = ErrorBody;

export type RedeployDeploymentData = Deployment;

export type RedeployDeploymentError = ErrorBody;

export type GetDeploymentData = Deployment;

export type GetDeploymentError = ErrorBody;

export type DeleteDeploymentData = any;

export type DeleteDeploymentError = ErrorBody;

export type GetBuildLogsData = BuildLogsResponseEntry;

export type GetBuildLogsError = ErrorBody;

export type GetAppLogsData = AppLogsResponseEntry;

export type GetAppLogsError = ErrorBody;

export type ListDomainsData = Domain[];

export type ListDomainsError = ErrorBody;

export type CreateDomainData = Domain;

export type CreateDomainError = ErrorBody;

export type GetDomainData = Domain;

export type GetDomainError = ErrorBody;

export type UpdateDomainAssociationData = any;

export type UpdateDomainAssociationError = ErrorBody;

export type DeleteDomainData = any;

export type DeleteDomainError = ErrorBody;

export type VerifyDomainData = any;

export type VerifyDomainError = ErrorBody;

export type AddDomainCertificateData = any;

export type AddDomainCertificateError = ErrorBody;

export type ProvisionDomainCertificatesData = any;

export type ProvisionDomainCertificatesError = ErrorBody;

export type AssetKindEnum = 'file';

export type AssetKindEnum1 = 'symlink';

export type ProvisioningStatusCodeEnum = 'success';

export type ProvisioningStatusCodeEnum1 = 'failed';

export type ProvisioningStatusCodeEnum2 = 'pending';

export type ProvisioningStatusCodeEnum3 = 'manual';

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, 'body' | 'bodyUsed'>;

export interface FullRequestParams extends Omit<RequestInit, 'body'> {
    /** set parameter to `true` for call `securityWorker` for this request */
    secure?: boolean;
    /** request path */
    path: string;
    /** content type of request body */
    type?: ContentType;
    /** query params */
    query?: QueryParamsType;
    /** format of response (i.e. response.json() -> format: "json") */
    format?: ResponseFormat;
    /** request body */
    body?: unknown;
    /** base url */
    baseUrl?: string;
    /** request cancellation token */
    cancelToken?: CancelToken;
}

export type RequestParams = Omit<FullRequestParams, 'body' | 'method' | 'query' | 'path'>;

export interface ApiConfig<SecurityDataType = unknown> {
    baseUrl?: string;
    baseApiParams?: Omit<RequestParams, 'baseUrl' | 'cancelToken' | 'signal'>;
    securityWorker?: (
        securityData: SecurityDataType | null
    ) => Promise<RequestParams | void> | RequestParams | void;
    customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
    data: D;
    error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
    Json = 'application/json',
    FormData = 'multipart/form-data',
    UrlEncoded = 'application/x-www-form-urlencoded',
    Text = 'text/plain',
}

export class HttpClient<SecurityDataType = unknown> {
    public baseUrl: string = 'https://api.deno.com/v1';
    private securityData: SecurityDataType | null = null;
    private securityWorker?: ApiConfig<SecurityDataType>['securityWorker'];
    private abortControllers = new Map<CancelToken, AbortController>();
    private customFetch = (...fetchParams: Parameters<typeof fetch>) => fetch(...fetchParams);

    private baseApiParams: RequestParams = {
        credentials: 'same-origin',
        headers: {},
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
    };

    constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
        Object.assign(this, apiConfig);
    }

    public setSecurityData = (data: SecurityDataType | null) => {
        this.securityData = data;
    };

    protected encodeQueryParam(key: string, value: any) {
        const encodedKey = encodeURIComponent(key);
        return `${encodedKey}=${encodeURIComponent(
            typeof value === 'number' ? value : `${value}`
        )}`;
    }

    protected addQueryParam(query: QueryParamsType, key: string) {
        return this.encodeQueryParam(key, query[key]);
    }

    protected addArrayQueryParam(query: QueryParamsType, key: string) {
        const value = query[key];
        return value.map((v: any) => this.encodeQueryParam(key, v)).join('&');
    }

    protected toQueryString(rawQuery?: QueryParamsType): string {
        const query = rawQuery || {};
        const keys = Object.keys(query).filter((key) => 'undefined' !== typeof query[key]);
        return keys
            .map((key) =>
                Array.isArray(query[key])
                    ? this.addArrayQueryParam(query, key)
                    : this.addQueryParam(query, key)
            )
            .join('&');
    }

    protected addQueryParams(rawQuery?: QueryParamsType): string {
        const queryString = this.toQueryString(rawQuery);
        return queryString ? `?${queryString}` : '';
    }

    private contentFormatters: Record<ContentType, (input: any) => any> = {
        [ContentType.Json]: (input: any) =>
            input !== null && (typeof input === 'object' || typeof input === 'string')
                ? JSON.stringify(input)
                : input,
        [ContentType.Text]: (input: any) =>
            input !== null && typeof input !== 'string' ? JSON.stringify(input) : input,
        [ContentType.FormData]: (input: any) =>
            Object.keys(input || {}).reduce((formData, key) => {
                const property = input[key];
                formData.append(
                    key,
                    property instanceof Blob
                        ? property
                        : typeof property === 'object' && property !== null
                        ? JSON.stringify(property)
                        : `${property}`
                );
                return formData;
            }, new FormData()),
        [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
    };

    protected mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
        return {
            ...this.baseApiParams,
            ...params1,
            ...(params2 || {}),
            headers: {
                ...(this.baseApiParams.headers || {}),
                ...(params1.headers || {}),
                ...((params2 && params2.headers) || {}),
            },
        };
    }

    protected createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
        if (this.abortControllers.has(cancelToken)) {
            const abortController = this.abortControllers.get(cancelToken);
            if (abortController) {
                return abortController.signal;
            }
            return void 0;
        }

        const abortController = new AbortController();
        this.abortControllers.set(cancelToken, abortController);
        return abortController.signal;
    };

    public abortRequest = (cancelToken: CancelToken) => {
        const abortController = this.abortControllers.get(cancelToken);

        if (abortController) {
            abortController.abort();
            this.abortControllers.delete(cancelToken);
        }
    };

    public request = async <T = any, E = any>({
        body,
        secure,
        path,
        type,
        query,
        format,
        baseUrl,
        cancelToken,
        ...params
    }: FullRequestParams): Promise<T> => {
        const secureParams =
            ((typeof secure === 'boolean' ? secure : this.baseApiParams.secure) &&
                this.securityWorker &&
                (await this.securityWorker(this.securityData))) ||
            {};
        const requestParams = this.mergeRequestParams(params, secureParams);
        const queryString = query && this.toQueryString(query);
        const payloadFormatter = this.contentFormatters[type || ContentType.Json];
        const responseFormat = format || requestParams.format;

        return this.customFetch(
            `${baseUrl || this.baseUrl || ''}${path}${queryString ? `?${queryString}` : ''}`,
            {
                ...requestParams,
                headers: {
                    ...(requestParams.headers || {}),
                    ...(type && type !== ContentType.FormData ? { 'Content-Type': type } : {}),
                },
                signal:
                    (cancelToken ? this.createAbortSignal(cancelToken) : requestParams.signal) ||
                    null,
                body: typeof body === 'undefined' || body === null ? null : payloadFormatter(body),
            }
        ).then(async (response) => {
            const r = response as HttpResponse<T, E>;
            r.data = null as unknown as T;
            r.error = null as unknown as E;

            const data = !responseFormat
                ? r
                : await response[responseFormat]()
                      .then((data) => {
                          if (r.ok) {
                              r.data = data;
                          } else {
                              r.error = data;
                          }
                          return r;
                      })
                      .catch((e) => {
                          r.error = e;
                          return r;
                      });

            if (cancelToken) {
                this.abortControllers.delete(cancelToken);
            }

            if (!response.ok) throw data;
            return data.data;
        });
    };
}

/**
 * @title Deno API
 * @version 1.0.0
 * @license
 * @baseUrl https://api.deno.com/v1
 * @contact Deno Land Inc. <deploy@deno.com>
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
    organizations = {
        /**
         * @description Get organization details
         *
         * @tags organization
         * @name GetOrganization
         * @summary Get organization details
         * @request GET:/organizations/{organizationId}
         * @secure
         * @response `200` `GetOrganizationData` Success
         * @response `400` `ErrorBody` Invalid Request
         * @response `401` `ErrorBody` Unauthorized
         * @response `404` `ErrorBody` Not Found
         */
        getOrganization: (organizationId: string, params: RequestParams = {}) =>
            this.request<GetOrganizationData, GetOrganizationError>({
                path: `/organizations/${organizationId}`,
                method: 'GET',
                secure: true,
                ...params,
            }),

        /**
         * @description Retrieve organization analytics This API returns analytics for the specified organization. The analytics are returned as time series data in 15 minute intervals, with the `time` field representing the start of the interval.
         *
         * @tags organization
         * @name GetOrganizationAnalytics
         * @summary Retrieve organization analytics
         * @request GET:/organizations/{organizationId}/analytics
         * @secure
         * @response `200` `GetOrganizationAnalyticsData` Success
         * @response `400` `ErrorBody` Invalid Request
         * @response `401` `ErrorBody` Unauthorized
         * @response `404` `ErrorBody` Not Found
         */
        getOrganizationAnalytics: (
            organizationId: string,
            query: {
                /**
                 *
                 * Start of the time range in RFC3339 format.
                 *
                 * Defaults to 24 hours ago.
                 *
                 * Note that the maximum allowed time range is 24 hours.
                 *
                 * @format date-time
                 * @example "2021-08-01T00:00:00Z"
                 */
                since: string;
                /**
                 *
                 * End of the time range in RFC3339 format.
                 *
                 * Defaults to the current time.
                 *
                 * Note that the maximum allowed time range is 24 hours.
                 *
                 * @format date-time
                 * @example "2021-08-02T00:00:00Z"
                 */
                until: string;
            },
            params: RequestParams = {}
        ) =>
            this.request<GetOrganizationAnalyticsData, GetOrganizationAnalyticsError>({
                path: `/organizations/${organizationId}/analytics`,
                method: 'GET',
                query: query,
                secure: true,
                ...params,
            }),

        /**
         * @description List projects of an organization This API returns a list of projects belonging to the specified organization in a pagenated manner. The URLs for the next, previous, first, and last page are returned in the `Link` header of the response, if any.
         *
         * @tags project
         * @name ListProjects
         * @summary List projects of an organization
         * @request GET:/organizations/{organizationId}/projects
         * @secure
         * @response `200` `ListProjectsData` Success
         * @response `400` `ErrorBody` Invalid Request
         * @response `401` `ErrorBody` Unauthorized
         * @response `404` `ErrorBody` Not Found
         */
        listProjects: (
            organizationId: string,
            query?: {
                /**
                 * The page number to return.
                 * @min 1
                 * @default 1
                 */
                page?: number | null;
                /**
                 * The maximum number of items to return per page.
                 * @min 1
                 * @max 100
                 * @default 20
                 */
                limit?: number | null;
                /** Query by project name or project ID */
                q?: string | null;
                /** The field to sort by, either `name` or `updated_at`. Defaults to `updated_at`. */
                sort?: string | null;
                /** Sort order, either `asc` or `desc`. Defaults to `asc`. */
                order?: string | null;
            },
            params: RequestParams = {}
        ) =>
            this.request<ListProjectsData, ListProjectsError>({
                path: `/organizations/${organizationId}/projects`,
                method: 'GET',
                query: query,
                secure: true,
                ...params,
            }),

        /**
         * @description Create a project This API allows you to create a new project under the specified organization. The project name is optional; if not provided, a random name will be generated.
         *
         * @tags project
         * @name CreateProject
         * @summary Create a project
         * @request POST:/organizations/{organizationId}/projects
         * @secure
         * @response `200` `CreateProjectData` Success
         * @response `400` `ErrorBody` Invalid Request
         * @response `401` `ErrorBody` Unauthorized
         * @response `404` `ErrorBody` Not Found
         */
        createProject: (
            organizationId: string,
            data: CreateProjectRequest,
            params: RequestParams = {}
        ) =>
            this.request<CreateProjectData, CreateProjectError>({
                path: `/organizations/${organizationId}/projects`,
                method: 'POST',
                body: data,
                secure: true,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * @description List KV databases of an organization This API returns a list of KV databases belonging to the specified organization in a pagenated manner. The URLs for the next, previous, first, and last page are returned in the `Link` header of the response, if any.
         *
         * @tags database
         * @name ListKvDatabases
         * @summary List KV databases of an organization
         * @request GET:/organizations/{organizationId}/databases
         * @secure
         * @response `200` `ListKvDatabasesData` Success
         * @response `400` `ErrorBody` Invalid Request
         * @response `401` `ErrorBody` Unauthorized
         * @response `404` `ErrorBody` Not Found
         */
        listKvDatabases: (
            organizationId: string,
            query?: {
                /**
                 * The page number to return.
                 * @min 1
                 * @default 1
                 */
                page?: number | null;
                /**
                 * The maximum number of items to return per page.
                 * @min 1
                 * @max 100
                 * @default 20
                 */
                limit?: number | null;
                /** Query by KV database ID */
                q?: string | null;
                /** The field to sort by. Currently only `created_at` is supported. */
                sort?: string | null;
                /** Sort order, either `asc` or `desc`. Defaults to `asc`. */
                order?: string | null;
            },
            params: RequestParams = {}
        ) =>
            this.request<ListKvDatabasesData, ListKvDatabasesError>({
                path: `/organizations/${organizationId}/databases`,
                method: 'GET',
                query: query,
                secure: true,
                ...params,
            }),

        /**
         * @description Create a KV database This API allows you to create a new KV database under the specified organization. You will then be able to associate the created KV database with a new deployment by specifying the KV database ID in the "Create a deployment" API call.
         *
         * @tags database
         * @name CreateKvDatabase
         * @summary Create a KV database
         * @request POST:/organizations/{organizationId}/databases
         * @secure
         * @response `200` `CreateKvDatabaseData` Success
         * @response `400` `ErrorBody` Invalid Request
         * @response `401` `ErrorBody` Unauthorized
         * @response `404` `ErrorBody` Not Found
         */
        createKvDatabase: (
            organizationId: string,
            data: CreateKvDatabaseRequest,
            params: RequestParams = {}
        ) =>
            this.request<CreateKvDatabaseData, CreateKvDatabaseError>({
                path: `/organizations/${organizationId}/databases`,
                method: 'POST',
                body: data,
                secure: true,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * @description List domains of an organization This API returns a list of domains belonging to the specified organization in a pagenated manner. The URLs for the next, previous, first, and last page are returned in the `Link` header of the response, if any.
         *
         * @tags domain
         * @name ListDomains
         * @summary List domains of an organization
         * @request GET:/organizations/{organizationId}/domains
         * @secure
         * @response `200` `ListDomainsData` Success
         * @response `400` `ErrorBody` Invalid Request
         * @response `401` `ErrorBody` Unauthorized
         * @response `404` `ErrorBody` Not Found
         */
        listDomains: (
            organizationId: string,
            query?: {
                /**
                 * The page number to return.
                 * @min 1
                 * @default 1
                 */
                page?: number | null;
                /**
                 * The maximum number of items to return per page.
                 * @min 1
                 * @max 100
                 * @default 20
                 */
                limit?: number | null;
                /** Query by domain */
                q?: string | null;
                /** The field to sort by, `domain`, `created_at`, or `updated_at`. Defaults to `updated_at`. */
                sort?: string | null;
                /** Sort order, either `asc` or `desc`. Defaults to `asc`. */
                order?: string | null;
            },
            params: RequestParams = {}
        ) =>
            this.request<ListDomainsData, ListDomainsError>({
                path: `/organizations/${organizationId}/domains`,
                method: 'GET',
                query: query,
                secure: true,
                ...params,
            }),

        /**
         * @description Add a domain to an organization This API allows you to add a new domain to the specified organization. Before use, added domain needs to be verified, and also TLS certificates for the domain need to be provisioned.
         *
         * @tags domain
         * @name CreateDomain
         * @summary Add a domain to an organization
         * @request POST:/organizations/{organizationId}/domains
         * @secure
         * @response `200` `CreateDomainData` Success
         * @response `400` `ErrorBody` Invalid Request
         * @response `401` `ErrorBody` Unauthorized
         * @response `404` `ErrorBody` Not Found
         */
        createDomain: (
            organizationId: string,
            data: CreateDomainRequest,
            params: RequestParams = {}
        ) =>
            this.request<CreateDomainData, CreateDomainError>({
                path: `/organizations/${organizationId}/domains`,
                method: 'POST',
                body: data,
                secure: true,
                type: ContentType.Json,
                ...params,
            }),
    };
    databases = {
        /**
         * @description Update KV database details
         *
         * @tags database
         * @name UpdateKvDatabase
         * @summary Update KV database details
         * @request PATCH:/databases/{databaseId}
         * @secure
         * @response `200` `UpdateKvDatabaseData` Success
         * @response `400` `ErrorBody` Invalid Request
         * @response `401` `ErrorBody` Unauthorized
         * @response `404` `ErrorBody` Not Found
         */
        updateKvDatabase: (
            databaseId: string,
            data: UpdateKvDatabaseRequest,
            params: RequestParams = {}
        ) =>
            this.request<UpdateKvDatabaseData, UpdateKvDatabaseError>({
                path: `/databases/${databaseId}`,
                method: 'PATCH',
                body: data,
                secure: true,
                type: ContentType.Json,
                ...params,
            }),
    };
    projects = {
        /**
         * @description Get project details
         *
         * @tags project
         * @name GetProject
         * @summary Get project details
         * @request GET:/projects/{projectId}
         * @secure
         * @response `200` `GetProjectData` Success
         * @response `400` `ErrorBody` Invalid Request
         * @response `401` `ErrorBody` Unauthorized
         * @response `404` `ErrorBody` Not Found
         */
        getProject: (projectId: string, params: RequestParams = {}) =>
            this.request<GetProjectData, GetProjectError>({
                path: `/projects/${projectId}`,
                method: 'GET',
                secure: true,
                ...params,
            }),

        /**
         * @description Update project details
         *
         * @tags project
         * @name UpdateProject
         * @summary Update project details
         * @request PATCH:/projects/{projectId}
         * @secure
         * @response `200` `UpdateProjectData` Success
         * @response `400` `ErrorBody` Invalid Request
         * @response `401` `ErrorBody` Unauthorized
         * @response `404` `ErrorBody` Not Found
         */
        updateProject: (
            projectId: string,
            data: UpdateProjectRequest,
            params: RequestParams = {}
        ) =>
            this.request<UpdateProjectData, UpdateProjectError>({
                path: `/projects/${projectId}`,
                method: 'PATCH',
                body: data,
                secure: true,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * @description Delete a project
         *
         * @tags project
         * @name DeleteProject
         * @summary Delete a project
         * @request DELETE:/projects/{projectId}
         * @secure
         * @response `200` `DeleteProjectData` Success
         * @response `400` `ErrorBody` Invalid Request
         * @response `401` `ErrorBody` Unauthorized
         * @response `404` `ErrorBody` Not Found
         */
        deleteProject: (projectId: string, params: RequestParams = {}) =>
            this.request<DeleteProjectData, DeleteProjectError>({
                path: `/projects/${projectId}`,
                method: 'DELETE',
                secure: true,
                ...params,
            }),

        /**
         * @description Retrieve project analytics This API returns analytics for the specified project. The analytics are returned as time series data in 15 minute intervals, with the `time` field representing the start of the interval.
         *
         * @tags project
         * @name GetProjectAnalytics
         * @summary Retrieve project analytics
         * @request GET:/projects/{projectId}/analytics
         * @secure
         * @response `200` `GetProjectAnalyticsData` Success
         * @response `400` `ErrorBody` Invalid Request
         * @response `401` `ErrorBody` Unauthorized
         * @response `404` `ErrorBody` Not Found
         */
        getProjectAnalytics: (
            projectId: string,
            query: {
                /**
                 *
                 * Start of the time range in RFC3339 format.
                 *
                 * Defaults to 24 hours ago.
                 *
                 * @format date-time
                 * @example "2021-08-01T00:00:00Z"
                 */
                since: string;
                /**
                 *
                 * End of the time range in RFC3339 format.
                 *
                 * Defaults to the current time.
                 *
                 * @format date-time
                 * @example "2021-08-02T00:00:00Z"
                 */
                until: string;
            },
            params: RequestParams = {}
        ) =>
            this.request<GetProjectAnalyticsData, GetProjectAnalyticsError>({
                path: `/projects/${projectId}/analytics`,
                method: 'GET',
                query: query,
                secure: true,
                ...params,
            }),

        /**
         * @description List deployments of a project This API returns a list of deployments belonging to the specified project in a pagenated manner. The URLs for the next, previous, first, and last page are returned in the `Link` header of the response, if any.
         *
         * @tags deployment
         * @name ListDeployments
         * @summary List deployments of a project
         * @request GET:/projects/{projectId}/deployments
         * @secure
         * @response `200` `ListDeploymentsData` Success
         * @response `400` `ErrorBody` Invalid Request
         * @response `401` `ErrorBody` Unauthorized
         * @response `404` `ErrorBody` Not Found
         */
        listDeployments: (
            projectId: string,
            query?: {
                /**
                 * The page number to return.
                 * @min 1
                 * @default 1
                 */
                page?: number | null;
                /**
                 * The maximum number of items to return per page.
                 * @min 1
                 * @max 100
                 * @default 20
                 */
                limit?: number | null;
                /** Query by deployment ID */
                q?: string | null;
                /** The field to sort by, either `id` or `created_at`. Defaults to `created_at`. */
                sort?: string | null;
                /** Sort order, either `asc` or `desc`. Defaults to `asc`. */
                order?: string | null;
            },
            params: RequestParams = {}
        ) =>
            this.request<ListDeploymentsData, ListDeploymentsError>({
                path: `/projects/${projectId}/deployments`,
                method: 'GET',
                query: query,
                secure: true,
                ...params,
            }),

        /**
         * @description Create a deployment This API initiates a build process for a new deployment. Note that this process is asynchronous; the completion of this API doesn't mean the deployment is ready. In order to keep track of the progress of the build, call the "Get build logs of a deployment" API or the "Get deployment details" API.
         *
         * @tags deployment
         * @name CreateDeployment
         * @summary Create a deployment
         * @request POST:/projects/{projectId}/deployments
         * @secure
         * @response `200` `CreateDeploymentData` Success
         * @response `400` `ErrorBody` Invalid Request
         * @response `401` `ErrorBody` Unauthorized
         * @response `404` `ErrorBody` Not Found
         */
        createDeployment: (
            projectId: string,
            data: CreateDeploymentRequest,
            params: RequestParams = {}
        ) =>
            this.request<CreateDeploymentData, CreateDeploymentError>({
                path: `/projects/${projectId}/deployments`,
                method: 'POST',
                body: data,
                secure: true,
                type: ContentType.Json,
                ...params,
            }),
    };
    deployments = {
        /**
         * @description Redeploy a deployment with different configuration
         *
         * @tags deployment
         * @name RedeployDeployment
         * @summary Redeploy a deployment with different configuration
         * @request POST:/deployments/{deploymentId}/redeploy
         * @secure
         * @response `200` `RedeployDeploymentData` Success
         * @response `400` `ErrorBody` Invalid Request
         * @response `401` `ErrorBody` Unauthorized
         * @response `404` `ErrorBody` Not Found
         */
        redeployDeployment: (
            deploymentId: DeploymentId,
            data: RedeployRequest,
            params: RequestParams = {}
        ) =>
            this.request<RedeployDeploymentData, RedeployDeploymentError>({
                path: `/deployments/${deploymentId}/redeploy`,
                method: 'POST',
                body: data,
                secure: true,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * @description Get deployment details
         *
         * @tags deployment
         * @name GetDeployment
         * @summary Get deployment details
         * @request GET:/deployments/{deploymentId}
         * @secure
         * @response `200` `GetDeploymentData` Success
         * @response `400` `ErrorBody` Invalid Request
         * @response `401` `ErrorBody` Unauthorized
         * @response `404` `ErrorBody` Not Found
         */
        getDeployment: (deploymentId: DeploymentId, params: RequestParams = {}) =>
            this.request<GetDeploymentData, GetDeploymentError>({
                path: `/deployments/${deploymentId}`,
                method: 'GET',
                secure: true,
                ...params,
            }),

        /**
         * @description Delete a deployment
         *
         * @tags deployment
         * @name DeleteDeployment
         * @summary Delete a deployment
         * @request DELETE:/deployments/{deploymentId}
         * @secure
         * @response `200` `DeleteDeploymentData` Success
         * @response `400` `ErrorBody` Invalid Request
         * @response `401` `ErrorBody` Unauthorized
         * @response `404` `ErrorBody` Not Found
         */
        deleteDeployment: (deploymentId: DeploymentId, params: RequestParams = {}) =>
            this.request<DeleteDeploymentData, DeleteDeploymentError>({
                path: `/deployments/${deploymentId}`,
                method: 'DELETE',
                secure: true,
                ...params,
            }),

        /**
         * @description Get build logs of a deployment This API returns build logs of the specified deployment. It's useful to watch the build progress, figure out what went wrong in case of a build failure, and so on. The response format can be controlled by the `Accept` header; if `application/x-ndjson` is specified, the response will be a stream of newline-delimited JSON objects. Otherwise it will be a JSON array of objects.
         *
         * @tags deployment
         * @name GetBuildLogs
         * @summary Get build logs of a deployment
         * @request GET:/deployments/{deploymentId}/build_logs
         * @secure
         * @response `200` `GetBuildLogsData` Success
         * @response `400` `ErrorBody` Invalid Request
         * @response `401` `ErrorBody` Unauthorized
         * @response `404` `ErrorBody` Not Found
         */
        getBuildLogs: (deploymentId: string, params: RequestParams = {}) =>
            this.request<GetBuildLogsData, GetBuildLogsError>({
                path: `/deployments/${deploymentId}/build_logs`,
                method: 'GET',
                secure: true,
                ...params,
            }),

        /**
         * @description Get execution logs of a deployment This API can return either past logs or real-time logs depending on the presence of the since and until query parameters; if at least one of them is provided, past logs are returned, otherwise real-time logs are returned. Also, the response format can be controlled by the `Accept` header; if `application/x-ndjson` is specified, the response will be a stream of newline-delimited JSON objects. Otherwise it will be a JSON array of objects.
         *
         * @tags deployment
         * @name GetAppLogs
         * @summary Get execution logs of a deployment
         * @request GET:/deployments/{deploymentId}/app_logs
         * @secure
         * @response `200` `GetAppLogsData` Success
         * @response `400` `ErrorBody` Invalid Request
         * @response `401` `ErrorBody` Unauthorized
         * @response `404` `ErrorBody` Not Found
         */
        getAppLogs: (
            deploymentId: string,
            query?: {
                /**
                 * Text to search for in log message.
                 * @example "foobar"
                 */
                q?: string | null;
                /**
                 * Log level(s) to filter logs by.
                 *
                 * Defaults to all levels (i.e. no filter applied).
                 *
                 * Multiple levels can be specified using comma-separated format.
                 * @example "error,warning"
                 */
                level?: LogLevel | null;
                /**
                 * Region(s) to filter logs by.
                 *
                 * Defaults to all regions (i.e. no filter applied).
                 *
                 * Multiple regions can be specified using comma-separated format.
                 * @example "gcp-us-central1,gcp-us-east1"
                 */
                region?: Region | null;
                /**
                 * Start time of the time range to filter logs by.
                 *
                 * Defaults to the Unix Epoch (though the log retention period is 2 weeks as
                 * of now).
                 *
                 * If neither `since` nor `until` is specified, real-time logs are returned.
                 * @format date-time
                 * @example "2021-08-01T00:00:00Z"
                 */
                since?: string | null;
                /**
                 * End time of the time range to filter logs by.
                 *
                 * Defaults to the current time.
                 *
                 * If neither `since` nor `until` is specified, real-time logs are returned.
                 * @format date-time
                 * @example "2021-08-01T00:00:00Z"
                 */
                until?: string | null;
                /**
                 * Maximum number of logs to return in one request.
                 *
                 * This is only effective for the past log mode.
                 * @min 1
                 * @max 10000
                 * @default 100
                 */
                limit?: number | null;
                /**
                 * The field to sort by. Currently only `time` is supported.
                 *
                 * This is only effective for the past log mode.
                 */
                sort?: string | null;
                /**
                 * Sort order, either `asc` or `desc`. Defaults to `desc`.
                 *
                 * For backward compatibility, `timeAsc` and `timeDesc` are also supported,
                 * but deprecated.
                 *
                 * This is only effective for the past log mode.
                 */
                order?: string | null;
                /**
                 * Opaque value that represents the cursor of the last log returned in the
                 * previous request.
                 *
                 * This is only effective for the past log mode.
                 */
                cursor?: string | null;
            },
            params: RequestParams = {}
        ) =>
            this.request<GetAppLogsData, GetAppLogsError>({
                path: `/deployments/${deploymentId}/app_logs`,
                method: 'GET',
                query: query,
                secure: true,
                ...params,
            }),
    };
    domains = {
        /**
         * @description Get domain details
         *
         * @tags domain
         * @name GetDomain
         * @summary Get domain details
         * @request GET:/domains/{domainId}
         * @secure
         * @response `200` `GetDomainData` Success
         * @response `400` `ErrorBody` Invalid Request
         * @response `401` `ErrorBody` Unauthorized
         * @response `404` `ErrorBody` Not Found
         */
        getDomain: (domainId: string, params: RequestParams = {}) =>
            this.request<GetDomainData, GetDomainError>({
                path: `/domains/${domainId}`,
                method: 'GET',
                secure: true,
                ...params,
            }),

        /**
         * @description Associate a domain with a deployment This API allows you to either: 1. associate a domain with a deployment, or 2. disassociate a domain from a deployment Domain association is required in order to serve the deployment on the domain. If the ownership of the domain is not verified yet, this API will trigger the verification process before associating the domain with the deployment.
         *
         * @tags domain
         * @name UpdateDomainAssociation
         * @summary Associate a domain with a deployment
         * @request PATCH:/domains/{domainId}
         * @secure
         * @response `200` `UpdateDomainAssociationData` Success
         * @response `400` `ErrorBody` Invalid Request
         * @response `401` `ErrorBody` Unauthorized
         * @response `404` `ErrorBody` Not Found
         */
        updateDomainAssociation: (
            domainId: string,
            data: UpdateDomainAssociationRequest,
            params: RequestParams = {}
        ) =>
            this.request<UpdateDomainAssociationData, UpdateDomainAssociationError>({
                path: `/domains/${domainId}`,
                method: 'PATCH',
                body: data,
                secure: true,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * @description Delete a domain
         *
         * @tags domain
         * @name DeleteDomain
         * @summary Delete a domain
         * @request DELETE:/domains/{domainId}
         * @secure
         * @response `200` `DeleteDomainData` Success
         * @response `400` `ErrorBody` Invalid Request
         * @response `401` `ErrorBody` Unauthorized
         * @response `404` `ErrorBody` Not Found
         */
        deleteDomain: (domainId: string, params: RequestParams = {}) =>
            this.request<DeleteDomainData, DeleteDomainError>({
                path: `/domains/${domainId}`,
                method: 'DELETE',
                secure: true,
                ...params,
            }),

        /**
         * @description Verify ownership of a domain This API triggers the ownership verification of a domain. It should be called after necessary DNS records are properly set up.
         *
         * @tags domain
         * @name VerifyDomain
         * @summary Verify ownership of a domain
         * @request POST:/domains/{domainId}/verify
         * @secure
         * @response `200` `VerifyDomainData` Success
         * @response `400` `ErrorBody` Invalid Request
         * @response `401` `ErrorBody` Unauthorized
         * @response `404` `ErrorBody` Not Found
         */
        verifyDomain: (domainId: string, params: RequestParams = {}) =>
            this.request<VerifyDomainData, VerifyDomainError>({
                path: `/domains/${domainId}/verify`,
                method: 'POST',
                secure: true,
                ...params,
            }),

        /**
         * @description Upload TLS certificate for a domain This API allows you to upload a TLS certificate for a domain. If the ownership of the domain is not verified yet, this API will trigger the verification process before storing the certificate.
         *
         * @tags domain
         * @name AddDomainCertificate
         * @summary Upload TLS certificate for a domain
         * @request POST:/domains/{domainId}/certificates
         * @secure
         * @response `200` `AddDomainCertificateData` Success
         * @response `400` `ErrorBody` Invalid Request
         * @response `401` `ErrorBody` Unauthorized
         * @response `404` `ErrorBody` Not Found
         */
        addDomainCertificate: (
            domainId: string,
            data: AddDomainCertificateRequest,
            params: RequestParams = {}
        ) =>
            this.request<AddDomainCertificateData, AddDomainCertificateError>({
                path: `/domains/${domainId}/certificates`,
                method: 'POST',
                body: data,
                secure: true,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * @description Provision TLS certificates for a domain This API begins the provisioning of TLS certificates for a domain. Note that a call to this API may take a while, up to a minute or so. If the ownership of the domain is not verified yet, this API will trigger the verification process before provisioning the certificate.
         *
         * @tags domain
         * @name ProvisionDomainCertificates
         * @summary Provision TLS certificates for a domain
         * @request POST:/domains/{domainId}/certificates/provision
         * @secure
         * @response `200` `ProvisionDomainCertificatesData` Success
         * @response `400` `ErrorBody` Invalid Request
         * @response `401` `ErrorBody` Unauthorized
         * @response `404` `ErrorBody` Not Found
         */
        provisionDomainCertificates: (domainId: string, params: RequestParams = {}) =>
            this.request<ProvisionDomainCertificatesData, ProvisionDomainCertificatesError>({
                path: `/domains/${domainId}/certificates/provision`,
                method: 'POST',
                secure: true,
                ...params,
            }),
    };
}
