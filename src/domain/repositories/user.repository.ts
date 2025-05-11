import { LoginDto, loginResponseDto } from "../dtos/login.dto";





export interface UserRepository {
    login(loginDto: LoginDto): Promise<loginResponseDto>;
    getUrlForOauth(provider: "google" | "github"): Promise<{ url: string }>;
    loginWithOAuthCode(provider: "google" | "github", code: string): Promise<any>;
    registerWithOauthCode(provider: "google" | "github", code: string, state: any): Promise<loginResponseDto>;
}