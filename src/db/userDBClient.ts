import { DynamoDB } from "aws-sdk";
import { User } from "../types/User";

const dbOptions = {
    region: process.env.AWS_REGION,
    endpoint: process.env.DB_ENDPOINT,
};

export default class UserDBClient {
    tableName: string;
    client: DynamoDB.DocumentClient;

    constructor() {
        this.tableName = process.env.USER_TABLE;
        this.client = new DynamoDB.DocumentClient(dbOptions);
    }

    async findById(id: string) {
        const params: DynamoDB.DocumentClient.GetItemInput = {
            TableName: this.tableName,
            Key: { id: id },
        };

        const data = await this.client.get(params).promise();
        return data.Item;
    }

    async findAll() {
        const data = await this.client.scan({ TableName: this.tableName }).promise();
        return data.Items;
    }

    async create(user: User) {
        const params: DynamoDB.DocumentClient.PutItemInput = {
            TableName: this.tableName,
            Item: user,
            ConditionExpression: "attribute_not_exists(id)"
        };

        return await this.client.put(params).promise();
    }

    async update(user: User) {
        const params: DynamoDB.DocumentClient.PutItemInput = {
            TableName: this.tableName,
            Item: user,
            ConditionExpression: "attribute_exists(id)"
        };

        return await this.client.put(params).promise();
    }

    async deleteById(id: string) {
        const params: DynamoDB.DocumentClient.DeleteItemInput = {
            TableName: this.tableName,
            Key: { id: id },
        };

        return await this.client.delete(params).promise();
    }
}