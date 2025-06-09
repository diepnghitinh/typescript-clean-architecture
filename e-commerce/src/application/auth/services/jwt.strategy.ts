import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { jwtConstants } from '@module-shared/constants/auth';

@Injectable()
export class JsonWebTokenStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtConstants.SECRET,
        });
    }

    async validate(payload: any) {
        return { user_id: payload.user_id, user_full_name: payload.user_full_name };
    }
}
