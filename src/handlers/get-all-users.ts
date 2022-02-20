import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

import UserDBClient from "../db/userDBClient";

export const getAllUsersHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    if (event.httpMethod !== 'GET') {
        throw new Error(`getAllUsersHandler only accept GET method, you tried: ${event.httpMethod}`);
    }

    console.info('received:', event);

    const dbClient = new UserDBClient();
    const items = await dbClient.findAll();

    const response = {
        statusCode: 200,
        body: JSON.stringify(items)
    };

    console.info(`response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`);
    return response;
}