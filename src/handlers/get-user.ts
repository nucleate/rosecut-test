import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import UserService from '../services/userService';

export const getUserHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    console.info('received:', event);

    const id = event.pathParameters.id;
    const response = await new UserService().getUserById(id);

    console.info(`response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`);
    return response;
}