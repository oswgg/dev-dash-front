import { ImplementationFactory } from "@/infrastructure/factories/Implementation.factory";
import { useState } from "react";
import { useAuth } from "../context/auth.context";
import { UserRepositoryImpl } from "@/infrastructure/repositories/user.repository.impl";
import { Login } from "@/application/login";
import { LoginDto } from "@/domain/dtos/login.dto";




export const useLogin = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [user, setUser] = useState(null);

    const { getAuthHeader, login } = useAuth();
    
    const apiClient = ImplementationFactory.createApiDatasource(getAuthHeader);
    const userRepository = new UserRepositoryImpl(apiClient);
    const loginUseCase = new Login(userRepository);
    
    const handleLogin = async (loginDto: LoginDto): Promise<boolean> => {
        try {
             
            setIsLoading(true);
            const res: { token: string, user: any } = await loginUseCase.execute(loginDto); 
            
            login(res.token);
            setUser(res.user);
            setIsLoading(false);
            return true;
        } catch (error: any) {
            setError(error.message);
            return false;
        }
    }
    

    return { 
        handleLogin,
        loginLoading: isLoading,
        loginUser: user,
        loginError: error,
    }
}