export const jwtConstants = {
    SECRET: process.env.JWT_SECRET_KEY,
    ACCESS_TOKEN_LIFETIME: process.env.NODE_ENV == 'production' ? '60m' : '30d',
    REFRESH_TOKEN_LIFETIME: process.env.NODE_ENV == 'production' ? '5d' : '1d',
};
