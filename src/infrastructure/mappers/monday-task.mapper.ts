import { MondayTask } from "@/domain/entities/monday-task.entity";
import { MondayUserMapper } from "./monday-user.mapper";
import { MondayUser } from "@/domain/entities/monday-user.entity";




export class MondayTaskMapper {
    static fromObjectToEntity(data: any): MondayTask {
        const { board, name, status } = data;

        if (!board) throw new Error("Invalid data");
        if (!name) throw new Error("Invalid data");
        if (!status) throw new Error("Invalid data");

        return {
            board,
            name,
            status,
        };
    }
    
    static fromApiResponseToEntity(data: any): { user: MondayUser, tasks: MondayTask[] } {
        const tasks = data.tasks.map(this.fromObjectToEntity);

        return {
            user: MondayUserMapper.fromObjectToEntity(data.user),
            tasks,
        };
    }
}