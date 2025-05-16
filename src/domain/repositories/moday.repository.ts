import { MondayTask } from "../entities/monday-task.entity";
import { MondayUser } from "../entities/monday-user.entity";




export interface MondayRepository {
    getTasks(): Promise<{ user: MondayUser, tasks: MondayTask[] }>;
    getUser(): Promise<MondayUser>;
}