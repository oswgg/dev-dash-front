import { useEffect, useState } from "react";
import { useAuthContext } from "../context/auth.context";
import { GetMondayTasks } from "@/application/getMondayTasks";
import { MondayRepositoryImpl } from "@/infrastructure/repositories/monday.repository.impl";
import { MondayFactory } from "@/infrastructure/factories/MondayFactory.factory";
import { MondayUser } from "@/domain/entities/monday-user.entity";
import { MondayTask } from "@/domain/entities/monday-task.entity";



export const useMondayTasks = () => {
    const [ data, setData ] = useState<{ user: MondayUser, tasks: MondayTask[] } | null>(null);
    const { getAuthHeader } = useAuthContext();
    
    const apiClient = MondayFactory.createApiDatasource(getAuthHeader());
    const mondayRepository = new MondayRepositoryImpl(apiClient);
    
    const getTasks = new GetMondayTasks(mondayRepository);
    
    const fetchTasks = async () => {
        const tasks = await getTasks.execute();
        
        console.log(tasks)
        
        setData(tasks);
    }
    
    useEffect(() => {
        fetchTasks();
    }, []);
    
    
    return {
        data,
    }

}