import { UserAccountEntity } from '../domain/user-account.entity';

export abstract class IUserRepository {
    findByEmailPassword: (username: string, password: string) => Promise<UserAccountEntity | null>;
    findById: (userId: string) => Promise<UserAccountEntity | null>;
}
