
import { Inject, Injectable } from "@nestjs/common";
import { IUsecaseQuery } from "@shared/interfaces/application.interface";
import { LoginDto } from "../dtos/login.dto";
import { LogExecution } from "@shared/decorators";

@Injectable()
@LogExecution()
export class GetUserLoginUsecase implements IUsecaseQuery<LoginDto, any> {
    constructor(
    ) {}

    public async query(loginDto: LoginDto): Promise<any> {
        return loginDto;
    }
}