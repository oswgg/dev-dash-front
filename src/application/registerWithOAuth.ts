import { loginResponseDto } from "@/domain/dtos/login.dto";
import { UserRepository } from "@/domain/repositories/user.repository";





export class RegisterWithOAuthCode {
    constructor(
        private readonly userRepository: UserRepository
    ) { }
    
    async execute(provider: "google" | "github", code: string, state: any): Promise<loginResponseDto> {
        return await this.userRepository.registerWithOauthCode(provider, code, state);
    }
}