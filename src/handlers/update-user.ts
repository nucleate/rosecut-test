import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import UserService from '../services/userService';

export const updateUserHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    console.info('received:', event);

    const id = event.pathParameters.id;
    const response = await new UserService().updateUser(id, event.body);

    console.info(`response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`);
    return response;
}