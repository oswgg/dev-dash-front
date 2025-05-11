import { ApiDatasource } from "@/domain/datasources/api.datasource";
import { LoginDto } from "@/domain/dtos/login.dto";
import { UserRepository } from "@/domain/repositories/user.repository";




export class UserRepositoryImpl implements UserRepository {
    constructor(
        private readonly api: ApiDatasource
    ) { }
    
    async login(loginDto: LoginDto): Promise<any> {
        const data: { token: string } = await this.api.post('/auth/login', loginDto);
        return data;
    }
    
    async getUrlForOauth(provider: "google" | "github"): Promise<{ url: string }> {
        return await this.api.get(`/auth/oauth/${provider}`);
    }
    
    async loginWithOAuthCode(provider: "google" | "github", code: string): Promise<any> {
        const data: { token: string, user: any } = await this.api.post(`/auth/oauth/${provider}/callback`, { code });
        return data;
    }
    
    async registerWithOauthCode(provider: "google" | "github", code: string, state: any): Promise<any> {
        const data: { token: string, user: any } = await this.api.post(`/auth/oauth/${provider}/callback`, { code, state });
        return data;
    }
}