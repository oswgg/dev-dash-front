import { LoginDto } from "../dtos/login.dto";





export interface UserRepository {
    login(loginDto: LoginDto): Promise<any>;
}