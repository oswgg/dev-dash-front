import { UserEntity } from "../entities/user.entity";


export interface LoginDto{
    email: string;
    password: string;
}

export interface loginResponseDto { 
    token: string;
    user: UserEntity;
}