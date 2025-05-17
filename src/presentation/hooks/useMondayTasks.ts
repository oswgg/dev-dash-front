import { useEffect, useState } from "react";
import { useAuthContext } from "../context/auth.context";
import { GetMondayTasks } from "@/application/getMondayTasks";
import { MondayRepositoryImpl } from "@/infrastructure/repositories/monday.repository.impl";
import { MondayFactory } from "@/infrastructure/factories/MondayFactory.factory";
import { MondayUser } from "@/domain/entities/monday-user.entity";
import { MondayTask } from "@/domain/entities/monday-task.entity";



export const useMondayTasks = (): {
    data: { user: MondayUser, tasks: MondayTask[] } | null,
    isLoading: boolean
} => {
    const [ data, setData ] = useState<{ user: MondayUser, tasks: MondayTask[] } | null>(null);
    const [ isLoading, setIsLoading ] = useState(false);
    const { getAuthHeader } = useAuthContext();
    
    const apiClient = MondayFactory.createApiDatasource(getAuthHeader());
    const mondayRepository = new MondayRepositoryImpl(apiClient);
    
    const getTasks = new GetMondayTasks(mondayRepository);
    
    const fetchTasks = async () => {
        setIsLoading(true);
        const tasks = await getTasks.execute();
        
        setData(tasks);
        setIsLoading(false);
    }
    
    useEffect(() => {
        fetchTasks();
    }, []);
    
    
    return {
        data,
        isLoading
    }

}