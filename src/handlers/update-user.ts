import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import UserDBClient from "../db/userDBClient";

export const updateUserHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    if (event.httpMethod !== 'PUT') {
        throw new Error(`updateUserHandler only accept PUT method, you tried: ${event.httpMethod}`);
    }

    console.info('received:', event);

    const body = JSON.parse(event.body);
    const id = event.pathParameters.id;
    const user = {
        id,
        ...body
    }

    let response = {
        statusCode: 500,
        body: JSON.stringify({ message: 'Internal Server Error' })
    };

    try {
        const dbClient = new UserDBClient();
        const data = await dbClient.update(user);

        response = {
            statusCode: 200,
            body: JSON.stringify(data)
        };
    } catch (e) {
        console.log('Error: ' + JSON.stringify(e));

        if (e.code === "ConditionalCheckFailedException") {
            response = {
                statusCode: 400,
                body: JSON.stringify({ message: "User doesn't exist" })
            }
        }
    }

    console.info(`response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`);
    return response;
}