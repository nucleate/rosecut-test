import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import UserService from '../services/userService';

export const getAllUsersHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    console.info('received:', event);

    const response = await new UserService().getAllUsers();

    console.info(`response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`);
    return response;
}