import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { UserOrmEntity } from '../entities/user.orm.entity';
import { IUserRepository } from '@application/auth/repositories/user.repository';
import { UserAccountEntity } from '@application/auth/domain/user-account.entity';
import { UniqueEntityID } from '@core/domain/unique-entity-id';
import { UserEmail } from '@application/auth/domain/user-email';
import { UserPassword } from '@application/auth/domain/user-password';
import { BaseRepository } from '@core/infrastructure/database/typeorm/base/repository.base';
import { CustomerOrmEntity } from '@infrastructure/customer/entities/customer.orm.entity';
import { LogExecution } from '@shared/decorators';

@Injectable()
@LogExecution()
export class UserRepository extends BaseRepository<UserAccountEntity, UserOrmEntity> implements IUserRepository {
    constructor(
        dataSource: DataSource,
    ) {
        super(UserOrmEntity, dataSource);
    }

    async findByEmailPassword(email: string, password: string): Promise<UserAccountEntity | null> {
        const user = await this.dataSource.createQueryBuilder()
            .from(UserOrmEntity, 'user')
            .leftJoin(CustomerOrmEntity, 'customer', 'customer.id = user.customer')
            .where('customer.email = :email', { email })
            .andWhere('user.password = :password', { password })
            .getOne();
        
        if (!user) return null;

        return await this.toDomain({
            email: email,
            ...user,
        });
    }

    async toDomain(ormEntity: any): Promise<UserAccountEntity> {
        const userEmailOrError = UserEmail.create(ormEntity.email);
        const userPasswordOrError = await UserPassword.create(ormEntity.password, true);

        if (userEmailOrError.isFailure || userPasswordOrError.isFailure) {
            throw new Error('Invalid user data');
        }

        const userOrError = await UserAccountEntity.create({
            userId: new UniqueEntityID(ormEntity.id),
            email: userEmailOrError.getValue(),
            password: userPasswordOrError.getValue()
        }, new UniqueEntityID(ormEntity.id));

        if (userOrError.isFailure) {
            throw new Error('Failed to create user entity');
        }

        return userOrError.getValue();
    }

    toOrmEntity(domainEntity: UserAccountEntity): void {
        // To do
    }
}