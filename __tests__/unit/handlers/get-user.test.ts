import { DocumentClient } from 'aws-sdk/clients/dynamodb';

import { buildAPIGatewayEvent } from '../../utils/builder';
import { getUserHandler } from '../../../src/handlers/get-user'
import { ResponseCode } from '../../../src/constants/responseCodes';

describe('Test get user', () => {
    let getSpy;

    beforeAll(() => {
        getSpy = jest.spyOn(DocumentClient.prototype, 'get');
    });

    afterAll(() => {
        getSpy.mockRestore();
    });

    it('Should return user by id', async () => {
        const user = { id: 'id1' };

        getSpy.mockReturnValue({
            promise: () => Promise.resolve({ Item: user })
        });

        const event = buildAPIGatewayEvent({
            httpMethod: 'GET',
            pathParameters: {
                id: 'id1'
            }
        });

        const result = await getUserHandler(event);

        const expectedResult = {
            statusCode: ResponseCode.OK,
            body: JSON.stringify(user)
        };

        expect(result).toEqual(expectedResult);
    });
}); 