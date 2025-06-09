import { LoginDto } from '../dtos/login.dto';
import { IUserRepository } from '@application/auth/repositories/user.repository';
import { AccessTokenEntity } from '@application/auth/domain/access-token.entity';
import { JwtService } from '@nestjs/jwt';

export interface IAuthFactory {
    login(_auth: LoginDto): Promise<AccessTokenEntity>;
    setUserRepository(_userRepository: IUserRepository);
    setJwtService(_jwtService: JwtService);
}
