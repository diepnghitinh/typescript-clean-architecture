import { LoginDto } from '../dtos/login.dto';
import { IAuthFactory } from './auth.interface';
import { AuthTokenBase } from './auth.token.base';
import { AccessTokenEntity } from '@application/auth/domain/access-token.entity';
import { UniqueEntityID } from '@core/domain';
import { jwtConstants } from '@module-shared/constants/auth';

export class AuthTokenPassword extends AuthTokenBase implements IAuthFactory {
    async login(_auth: LoginDto): Promise<AccessTokenEntity> {
        const user = await this.userRepository.findByEmailPassword(_auth.email, _auth.password);
        const accessTokenOrError = await AccessTokenEntity.create(
            {
                accessToken: this.jwtService.sign({
                    token_type: 'access',
                    user_id: user.userId.toString(),
                    user_full_name: user.fullName,
                }),
                refreshToken: this.jwtService.sign(
                    {
                        token_type: 'refresh',
                        user_id: user.userId.toString(),
                        user_full_name: user.fullName,
                    },
                    {
                        expiresIn: jwtConstants.REFRESH_TOKEN_LIFETIME,
                    },
                ),
            },
            new UniqueEntityID(),
        );
        return accessTokenOrError.getValue();
    }
}
