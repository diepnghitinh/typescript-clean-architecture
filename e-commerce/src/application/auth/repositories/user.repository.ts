import { UserAccountEntity } from "../domain/user-account.entity";
import { UniqueEntityID } from "@core/domain/unique-entity-id";

export abstract class IUserRepository {
    findByEmailPassword: (username: string, password: string) => Promise<UserAccountEntity | null>;
}
