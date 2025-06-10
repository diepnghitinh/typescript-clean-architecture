import { UniqueEntityID } from '@core/domain/unique-entity-id';
import { UserEmail } from './user-email';
import { UserPassword } from './user-password';

export interface UserAccountProps {
    userId: UniqueEntityID;
    email: UserEmail;
    password?: UserPassword;
    fullName?: string;
}
