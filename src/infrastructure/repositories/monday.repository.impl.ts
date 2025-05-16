import { ApiDatasource } from "@/domain/datasources/api.datasource";
import { MondayTask } from "@/domain/entities/monday-task.entity";
import { MondayUser } from "@/domain/entities/monday-user.entity";
import { MondayUserMapper } from "../mappers/monday-user.mapper";
import { MondayTaskMapper } from "../mappers/monday-task.mapper";





export class MondayRepositoryImpl {
    constructor(
        private readonly api: ApiDatasource
    ) { }
    
    async getTasks(): Promise<{ user: MondayUser, tasks: MondayTask[] } | never> {
        const data = await this.api.get("/services/monday/tasks");
        if (!data) {
            throw new Error("Invalid data");
        }

        const mondayTasks = MondayTaskMapper.fromApiResponseToEntity(data);
        return mondayTasks;
    }
    
    async getUser(): Promise<MondayUser> {
        const data = await this.api.get("/services/monday/user");
        
        return MondayUserMapper.fromObjectToEntity(data);
    }
}