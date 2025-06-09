import { Injectable } from '@nestjs/common';
import { Mapper } from '@core/infrastructure/mapper';
import { AccessTokenResponseDto } from '@application/auth/dtos/auth-token.response.dto';
import { AccessTokenEntity } from '@application/auth/domain/access-token.entity';

@Injectable()
export class AccessTokenMapper implements Mapper<AccessTokenEntity, any, AccessTokenResponseDto> {
    public toResponse(entity: AccessTokenEntity): AccessTokenResponseDto {
        return {
            accessToken: entity.accessToken,
            refreshToken: entity.refreshToken,
        };
    }

    toDomain(record: any): AccessTokenEntity {
        return undefined;
    }

    toPersistence(entity: AccessTokenEntity): any {
        return undefined;
    }
}
