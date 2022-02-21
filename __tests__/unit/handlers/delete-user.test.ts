import { DocumentClient } from 'aws-sdk/clients/dynamodb';

import { buildAPIGatewayEvent } from '../../utils/builder';
import { deleteUserHandler } from '../../../src/handlers/delete-user'
import { ResponseCode } from '../../../src/constants/responseCodes';

describe('Test delete user', () => {
    let deleteSpy;

    beforeAll(() => {
        deleteSpy = jest.spyOn(DocumentClient.prototype, 'delete');
    });

    afterAll(() => {
        deleteSpy.mockRestore();
    });

    it('Should delete user by id', async () => {
        const user = { id: 'id1' };

        deleteSpy.mockReturnValue({
            promise: () => Promise.resolve({})
        });

        const event = buildAPIGatewayEvent({
            httpMethod: 'DELETE',
            pathParameters: {
                id: user.id
            }
        });

        const result = await deleteUserHandler(event);

        expect(deleteSpy).toHaveBeenCalled();
        expect(result.statusCode).toEqual(ResponseCode.OK);
    });
}); 