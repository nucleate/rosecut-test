import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import UserDBClient from "../db/userDBClient";

export const getUserHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    if (event.httpMethod !== 'GET') {
        throw new Error(`getUserHandler only accept GET method, you tried: ${event.httpMethod}`);
    }

    console.info('received:', event);

    const id = event.pathParameters.id;

    const dbClient = new UserDBClient();
    const user = await dbClient.findById(id);

    const response = {
        statusCode: 200,
        body: JSON.stringify(user)
    };

    console.info(`response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`);
    return response;
}