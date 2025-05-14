import { ImplementationFactory } from "@/infrastructure/factories/Implementation.factory";
import { useState } from "react";
import { useAuthContext } from "../context/auth.context";
import { UserRepositoryImpl } from "@/infrastructure/repositories/user.repository.impl";
import { Login } from "@/application/login";
import { LoginDto } from "@/domain/dtos/login.dto";
import { RegisterWithOAuthCode } from "@/application/registerWithOauth";
import { UserEntity } from "@/domain/entities/user.entity";




export const useAuth = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [user, setUser] = useState<UserEntity | null>(null);

    const { getAuthHeader, login } = useAuthContext();
    
    const apiClient = ImplementationFactory.createApiDatasource(getAuthHeader);
    const userRepository = new UserRepositoryImpl(apiClient);

    const loginUseCase = new Login(userRepository);
    const registerWithOAuthCodeUseCase = new RegisterWithOAuthCode(userRepository);
    
    const handleLogin = async (loginDto: LoginDto): Promise<boolean> => {
        try {
            setIsLoading(true);
            const res = await loginUseCase.execute(loginDto); 
            
            login(res.token);
            setUser(res.user);
            setIsLoading(false);
            return true;
        } catch (error: any) {
            setError(error.message);
            setIsLoading(false);
            return false;
        }
    }
    
    const getOAuthUrl = async (provider: "google" | "github") => {
        try {
            setIsLoading(true);
            const data: { url: string } = await userRepository.getUrlForOauth(provider);
            return data.url;
        } catch (error: any) {
            setError(error.message);
            setIsLoading(false);
        }
    }
    
    const registerWithOAuthCode = async (provider: "google" | "github", code: string, state: any) => {
        try {
            setIsLoading(true);
            const data = await registerWithOAuthCodeUseCase.execute(provider, code, state);

            login(data.token);
            setUser(data.user);
            setIsLoading(false);
            return true;
        } catch (error: any) {
            setError(error.message);
            setIsLoading(false);
            return false;
        }
    }
    

    return { 
        handleLogin,
        getOAuthUrl,
        registerWithOAuthCode,
        loading: isLoading,
        loginUser: user,
        loginError: error,
    }
}