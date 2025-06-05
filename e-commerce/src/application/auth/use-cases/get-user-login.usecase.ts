
import { Inject, Injectable } from "@nestjs/common";
import { IUsecaseQuery } from "@shared/interfaces/application.interface";
import { LoginDto } from "../dtos/login.dto";
import { LogExecution } from "@shared/decorators";
import { IUserRepository } from "../repositories/user.repository";
import { Result } from "@shared/logic/result";
import { UserAccountEntity } from "../domain/user-account.entity";

@Injectable()
@LogExecution()
export class GetUserLoginUsecase implements IUsecaseQuery<LoginDto, any> {
    constructor(
        @Inject(IUserRepository)
        private readonly userRepository: IUserRepository,
    ) {}

    public async query(loginDto: LoginDto): Promise<any> {
        const user = await this.userRepository.findByEmailPassword(loginDto.email, loginDto.password);
        const found = !!user;
        if (found) {
            return Result.ok<UserAccountEntity>(user);
        }
            
        return Result.fail<UserAccountEntity>(`User not found`);
    }
}