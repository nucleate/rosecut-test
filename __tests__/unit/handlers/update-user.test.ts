import { DocumentClient } from 'aws-sdk/clients/dynamodb';

import { buildAPIGatewayEvent } from '../../utils/builder';
import { updateUserHandler } from '../../../src/handlers/update-user'
import { User } from '../../../src/types/User';

describe('Test update user', () => {
    let putSpy;

    beforeAll(() => {
        putSpy = jest.spyOn(DocumentClient.prototype, 'put');
    });

    afterAll(() => {
        putSpy.mockRestore();
    });

    it('Should update existing user', async () => {
        const user: Partial<User> = { id: 'id1', firstName: 'John', lastName: 'Does' };

        putSpy.mockReturnValue({
            promise: () => Promise.resolve(user)
        });

        const event = buildAPIGatewayEvent({
            httpMethod: 'PUT',
            pathParameters: {
                id: user.id
            }
        }, user);

        const result = await updateUserHandler(event);

        const expectedResult = {
            statusCode: 200,
            body: JSON.stringify(user)
        };

        expect(putSpy).toHaveBeenCalled();
        expect(result).toEqual(expectedResult);
    });
}); 