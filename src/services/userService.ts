import { ResponseCode } from "../constants/responseCodes";
import UserRepository from "../db/userRepository";
import { IUser } from "../types/user";
import { buildInternalServerErrorResponse, buildMissingIdResponse, buildResponse } from "../utils/responseBuilders";
import { validateUser } from "../utils/validators";

export default class UserService {
    private readonly userRepository = new UserRepository();

    async getUserById(id: string | undefined) {
        if (!id) {
            return buildMissingIdResponse();
        }

        const user = await this.userRepository.findUserById(id);
        if (!user) {
            return buildResponse(ResponseCode.NOT_FOUND, { message: 'User not found' });
        }

        return buildResponse(ResponseCode.OK, user);
    }

    async getAllUsers() {
        const users = await this.userRepository.findAllUsers();
        return buildResponse(ResponseCode.OK, users);
    }

    async createNewUser(body: string) {
        try {
            const user: IUser = JSON.parse(body);

            const validationMessage = validateUser(user);
            if (validationMessage !== "OK") {
                return buildResponse(ResponseCode.BAD_REQUEST, { message: validationMessage })
            }

            const data = await this.userRepository.create(user);

            return buildResponse(201, data);
        } catch (e) {
            console.log('Error: ' + JSON.stringify(e));

            if (e.code === "ConditionalCheckFailedException") {
                return buildResponse(ResponseCode.BAD_REQUEST, { message: "User already exists" })
            }

            return buildResponse(ResponseCode.INTERNAL_SERVER_ERROR, { message: "Internal server error" })
        }
    }

    async updateUser(id: string | undefined, body: string) {
        if (!id) {
            return buildMissingIdResponse();
        }

        const userUpdate = JSON.parse(body);

        const user: IUser = {
            id,
            ...userUpdate
        }

        const validationMessage = validateUser(user);
        if (validationMessage !== "OK") {
            return buildResponse(ResponseCode.BAD_REQUEST, { message: validationMessage })
        }

        try {
            const data = await this.userRepository.updateUser(user);

            return buildResponse(ResponseCode.OK, data);
        } catch (e) {
            console.log('Error: ' + JSON.stringify(e));

            if (e.code === "ConditionalCheckFailedException") {
                return buildResponse(ResponseCode.BAD_REQUEST, { message: "User doesn't exist" })
            }

            return buildInternalServerErrorResponse();
        }
    }

    async deleteUserById(id: string | undefined) {
        if (!id) {
            return buildMissingIdResponse();
        }

        await this.userRepository.deleteUserById(id);

        return buildResponse(ResponseCode.OK);
    }
}