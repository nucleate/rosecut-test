import { DocumentClient } from 'aws-sdk/clients/dynamodb';

import { buildAPIGatewayEvent } from '../../utils/builder';
import { createUserHandler } from '../../../src/handlers/create-user'
import { User } from '../../../src/types/User';

describe('Test create new user', () => {
    let putSpy;

    beforeAll(() => {
        putSpy = jest.spyOn(DocumentClient.prototype, 'put');
    });

    afterAll(() => {
        putSpy.mockRestore();
    });

    it('Should create new user', async () => {
        const user: Partial<User> = { id: 'id1', firstName: 'John', lastName: 'Doe' };

        putSpy.mockReturnValue({
            promise: () => Promise.resolve(user)
        });

        const event = buildAPIGatewayEvent({
            httpMethod: 'POST'
        }, user);

        const result = await createUserHandler(event);

        const expectedResult = {
            statusCode: 201,
            body: JSON.stringify(user)
        };

        expect(putSpy).toHaveBeenCalled();
        expect(result).toEqual(expectedResult);
    });
}); 