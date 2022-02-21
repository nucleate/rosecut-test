import { ResponseCode } from "../constants/responseCodes";

export const buildResponse = (statusCode: ResponseCode = ResponseCode.INTERNAL_SERVER_ERROR, body?: object) => {
    return {
        statusCode,
        body: JSON.stringify(body)
    }
}

export const buildMissingIdResponse = () => {
    return buildResponse(ResponseCode.INTERNAL_SERVER_ERROR, { message: 'Provide user id' });
}

export const buildInternalServerErrorResponse = () => {
    return buildResponse(ResponseCode.INTERNAL_SERVER_ERROR, { message: "Internal server error" })
}