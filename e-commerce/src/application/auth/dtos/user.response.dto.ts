export interface IJwtPayload {
    sub: string;
    user_id: string;
    user_full_name: string;
    iat?: number;
    exp?: number;
}
