import { IUser } from "../types/user";
import DynamoRepository from "./dynamoRepository";


export default class UserRepository extends DynamoRepository<IUser, string> {

    constructor() {
        super(process.env.USER_TABLE);
    }

    public async findUserById(id: string): Promise<IUser | null> {
        return this.findById(id);
    }

    public async findAllUsers(): Promise<Array<IUser>> {
        return this.findAll();
    }

    public async createUser(user: IUser): Promise<IUser> {
        return this.create(user);
    }

    public async updateUser(user: IUser): Promise<IUser> {
        return this.update(user);
    }

    public async deleteUserById(id: string): Promise<void> {
        return this.deleteById(id);
    }
}