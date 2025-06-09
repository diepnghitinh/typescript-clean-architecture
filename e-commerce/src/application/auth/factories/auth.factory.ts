import { AuthTokenBase } from './auth.token.base';
import { AuthTokenPassword } from './auth.token.password';

export class AuthFactory {
    private _authBase: AuthTokenBase;

    instance(grant_type: string = 'password'): AuthTokenBase {
        this._authBase = new AuthTokenBase();
        switch (grant_type) {
            case 'refresh':
            case 'password':
                this._authBase = new AuthTokenPassword();
                return this._authBase;
        }
        return this._authBase;
    }
}
