import { LoginDto } from '../dtos/login.dto';
import { IAuthFactory } from './auth.interface';
import { IUserRepository } from '@application/auth/repositories/user.repository';
import { AccessTokenEntity } from '@application/auth/domain/access-token.entity';
import { JwtService } from '@nestjs/jwt';

export class AuthTokenBase implements IAuthFactory {
    protected userRepository: IUserRepository;
    protected jwtService: JwtService;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async login(_auth: LoginDto): Promise<AccessTokenEntity> {
        throw new Error('Method not implemented.');
    }

    setUserRepository(_userRepository: IUserRepository) {
        this.userRepository = _userRepository;
    }

    setJwtService(_jwtService: JwtService) {
        this.jwtService = _jwtService;
    }
}
