import { MondayTask } from "@/domain/entities/monday-task.entity";
import { MondayUser } from "@/domain/entities/monday-user.entity";
import { MondayRepository } from "@/domain/repositories/moday.repository";




export class GetMondayTasks {
    constructor(
        private readonly mondayRepository: MondayRepository
    ) { }
    
    async execute(): Promise<{ user: MondayUser, tasks: MondayTask[] }> {
        const tasks = await this.mondayRepository.getTasks();
        return tasks;
    }
}