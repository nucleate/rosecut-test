import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

import UserDBClient from '../db/userDBClient';

export const createUserHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    if (event.httpMethod !== 'POST') {
        throw new Error(`createUserHandler only accepts POST method, you tried: ${event.httpMethod} method.`);
    }

    console.info('received:', event);

    const body = JSON.parse(event.body);

    let response = {
        statusCode: 500,
        body: 'Internal Server Error'
    };

    try {
        const dbClient = new UserDBClient();
        const data = await dbClient.create(body);

        response = {
            statusCode: 201,
            body: JSON.stringify(data)
        };
    } catch (e) {
        console.log('Error: ' + JSON.stringify(e));

        if (e.code === "ConditionalCheckFailedException") {
            response = {
                statusCode: 400,
                body: "User already exists"
            }
        }
    }

    console.info(`response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`);

    return response;
}