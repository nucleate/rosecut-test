import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import UserDBClient from "../db/userDBClient";

export const deleteUserHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    if (event.httpMethod !== 'DELETE') {
        throw new Error(`deleteUserHandler only accept DELETE method, you tried: ${event.httpMethod}`);
    }

    console.info('received:', event);

    const id = event.pathParameters.id;

    const dbClient = new UserDBClient();
    const data = await dbClient.deleteById(id);

    const response = {
        statusCode: 200,
        body: JSON.stringify(data)
    };

    console.info(`response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`);
    return response;
}