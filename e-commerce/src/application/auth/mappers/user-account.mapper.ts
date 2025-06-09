import { Mapper } from '@core/infrastructure/mapper';
import { UserAccountEntity } from '@application/auth/domain/user-account.entity';
import { UserOrmEntity } from '@infrastructure/auth/entities/user.orm.entity';
import { UserAccountResponseDto } from '../dtos/user-account.response.dto';
import {Injectable} from "@nestjs/common";

@Injectable()
export class UserAccountMapper
    implements Mapper<UserAccountEntity, UserOrmEntity, UserAccountResponseDto>
{
    public toPersistence(entity: UserAccountEntity): UserOrmEntity {
        throw new Error('Method not implemented.');
    }
    public toDomain(record: any): UserAccountEntity {
        throw new Error('Method not implemented.');
    }
    public toResponse(entity: UserAccountEntity): UserAccountResponseDto {
        return {
            id: entity.id.toString(),
            email: entity.email.value,
            fullName: entity.fullName,
            isActive: true, // This should come from the entity if available
            createdAt: new Date(), // These should come from the entity if available
            updatedAt: new Date(),
        };
    }
}
