export const jwtConstants = {
    SECRET: 'ExXIBKU6P3tVGFmzf6VyMJKrKvy7p4m5',
    ACCESS_TOKEN_LIFETIME: process.env.NODE_ENV == 'production' ? '60m' : '30d',
    REFRESH_TOKEN_LIFETIME: process.env.NODE_ENV == 'production' ? '5d' : '1d',
};
