import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { UserOrmEntity } from '../entities/user.orm.entity';
import { IUserRepository } from '@application/auth/repositories/user.repository';
import { UserAccountEntity } from '@application/auth/domain/user-account.entity';
import { UniqueEntityID } from '@core/domain/unique-entity-id';
import { UserEmail } from '@application/auth/domain/user-email';
import { BaseRepository } from '@core/infrastructure/database/typeorm/base/repository.base';
import { CustomerOrmEntity } from '@infrastructure/customer/entities/customer.orm.entity';
import { LogExecution } from '@shared/decorators';
import { Result } from '@shared/logic/result';

@Injectable()
@LogExecution()
export class UserRepository
    extends BaseRepository<UserAccountEntity, UserOrmEntity>
    implements IUserRepository
{
    constructor(dataSource: DataSource) {
        super(UserOrmEntity, dataSource);
    }

    async findByEmailPassword(email: string, password: string): Promise<UserAccountEntity | null> {
        const user = await this.dataSource
            .createQueryBuilder()
            .select('user.id')
            .addSelect('customer.firstName', 'firstName')
            .addSelect('customer.lastName', 'lastName')
            .from(UserOrmEntity, 'user')
            .leftJoin(CustomerOrmEntity, 'customer', 'customer.id = user.customer')
            .where('customer.email = :email', { email })
            .andWhere('user.password = :password', { password })
            .getRawOne();

        if (!user) return null;

        return this.toDomain({
            email: email,
            password: password,
            ...user,
        });
    }

    async findById(userId: string): Promise<UserAccountEntity | null> {
        const user = await this.dataSource
            .createQueryBuilder()
            .from(UserOrmEntity, 'user')
            .select('user.id')
            .addSelect('customer.email', 'email')
            .addSelect('customer.firstName', 'firstName')
            .addSelect('customer.lastName', 'lastName')
            .leftJoin(CustomerOrmEntity, 'customer', 'customer.id = user.customer')
            .where('user.id = :userId', { userId })
            .getRawOne();

        if (!user) return null;

        return this.toDomain(user);
    }

    async toDomain(ormEntity: any): Promise<UserAccountEntity> {
        const userEmailOrError = UserEmail.create(ormEntity.email);

        const combinedPropsResult = Result.combine([userEmailOrError]);

        if (combinedPropsResult.isFailure) {
            throw new Error(combinedPropsResult.error);
        }

        const userOrError = await UserAccountEntity.create(
            {
                userId: new UniqueEntityID(ormEntity.id),
                email: userEmailOrError.getValue(),
                fullName: `${ormEntity.lastName} ${ormEntity.firstName}`,
            },
            new UniqueEntityID(ormEntity.id),
        );

        if (userOrError.isFailure) {
            throw new Error('Failed to create user entity');
        }

        return userOrError.getValue();
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    toOrmEntity(domainEntity: UserAccountEntity): void {
        // To do
    }
}
