import { ApiDatasource } from "@/domain/datasources/api.datasource";
import { LoginDto } from "@/domain/dtos/login.dto";




export class UserRepositoryImpl {  
    constructor(
        private readonly api: ApiDatasource
    ) { }
    
    async login(loginDto: LoginDto): Promise<any> {
        const data: { token: string } = await this.api.post('/user/login', loginDto);
        return data;
    }
}