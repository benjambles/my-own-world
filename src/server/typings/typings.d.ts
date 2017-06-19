declare module "*.json" {
    const value: any;
    export default value;
}

interface APIResponse {
    meta: APIMeta;
    body: APIBody;
}

interface APIMeta {
    message?: string;
    lastModified?: string;
}

interface APIBody {
    description?: String;
    [propName: string]: any;
}

interface APIError {
    statusCode: number;
    message: String;
    id: String;
}