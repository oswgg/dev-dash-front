import { LoginDto } from "@/domain/dtos/login.dto";
import { UserRepository } from "@/domain/repositories/user.repository";





export class Login {
    constructor(
        private readonly userRepository: UserRepository
    ) { }

    async execute(loginDto: LoginDto): Promise<any> {
        return await this.userRepository.login(loginDto);
    }
}