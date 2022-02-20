import { DocumentClient } from 'aws-sdk/clients/dynamodb';

import { buildAPIGatewayEvent } from '../../utils/builder';
import { getAllUsersHandler } from '../../../src/handlers/get-all-users'

describe('Test get all users', () => {
    let scanSpy;

    beforeAll(() => {
        scanSpy = jest.spyOn(DocumentClient.prototype, 'scan');
    });

    afterAll(() => {
        scanSpy.mockRestore();
    });

    it('Compare list of ids', async () => {
        const users = [{ id: 'id1' }, { id: 'id2' }];

        scanSpy.mockReturnValue({
            promise: () => Promise.resolve({ Items: users })
        });

        const event = buildAPIGatewayEvent();

        const result = await getAllUsersHandler(event);

        const expectedResult = {
            statusCode: 200,
            body: JSON.stringify(users)
        };

        expect(result).toEqual(expectedResult);
    });
}); 