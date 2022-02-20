import { APIGatewayProxyEvent } from "aws-lambda";

const DEFAULT_OPTIONS = { httpMethod: "GET", headers: {}, query: {}, path: "/" }

export function buildAPIGatewayEvent(options: Partial<APIGatewayProxyEvent> = DEFAULT_OPTIONS, payload?: object): APIGatewayProxyEvent {
    const opts = Object.assign({}, DEFAULT_OPTIONS, options);

    return {
        httpMethod: opts.httpMethod,
        path: opts.path,
        queryStringParameters: opts.queryStringParameters,
        headers: opts.headers,
        body: opts.body || JSON.stringify(payload),
        multiValueHeaders: {},
        multiValueQueryStringParameters: {},
        isBase64Encoded: false,
        pathParameters: opts.pathParameters || {},
        stageVariables: {},
        requestContext: null,
        resource: null,
    }
}