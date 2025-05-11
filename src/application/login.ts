import { LoginDto, loginResponseDto } from "@/domain/dtos/login.dto";
import { UserRepository } from "@/domain/repositories/user.repository";





export class Login {
    constructor(
        private readonly userRepository: UserRepository
    ) { }

    async execute(loginDto: LoginDto): Promise<loginResponseDto> {
        return await this.userRepository.login(loginDto);
    }
}