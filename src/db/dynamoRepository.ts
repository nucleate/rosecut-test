import { DynamoDB } from "aws-sdk";

const dbOptions = {
    region: process.env.AWS_REGION,
    endpoint: process.env.DB_ENDPOINT,
};


export default abstract class DynamoRepository<T, ID> {
    private readonly tableName: string
    private readonly client: DynamoDB.DocumentClient;

    constructor(tableName: string) {
        this.tableName = tableName;
        this.client = new DynamoDB.DocumentClient(dbOptions);
    }

    async findById(id: ID): Promise<T | null> {
        const params: DynamoDB.DocumentClient.GetItemInput = {
            TableName: this.tableName,
            Key: { id: id },
        };

        const data = await this.client.get(params).promise();
        return data.Item as T;
    }

    async findAll(): Promise<Array<T>> {
        const data = await this.client.scan({ TableName: this.tableName }).promise();
        return data.Items as Array<T>;
    }

    async create(entity: T): Promise<T> {
        const params: DynamoDB.DocumentClient.PutItemInput = {
            TableName: this.tableName,
            Item: entity,
            ConditionExpression: "attribute_not_exists(id)"
        };

        await this.client.put(params).promise();
        return entity;
    }

    async update(entity: T): Promise<T> {
        const params: DynamoDB.DocumentClient.PutItemInput = {
            TableName: this.tableName,
            Item: entity,
            ConditionExpression: "attribute_exists(id)"
        };

        await this.client.put(params).promise();

        return entity;
    }

    async deleteById(id: ID): Promise<void> {
        const params: DynamoDB.DocumentClient.DeleteItemInput = {
            TableName: this.tableName,
            Key: { id: id },
        };

        await this.client.delete(params).promise();
    }
}