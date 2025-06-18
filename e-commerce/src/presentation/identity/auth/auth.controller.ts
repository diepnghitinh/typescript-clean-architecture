import { LoginDto } from '@application/auth/dtos/login.dto';
import {BadRequestException, Body, Controller, Get, HttpCode, HttpStatus, Param, Post, UseGuards} from '@nestjs/common';
import {ApiTags, ApiOperation, ApiResponse, ApiBearerAuth} from '@nestjs/swagger';
import { Public } from '@core/decorators';
import { AuthenticationException } from '@core/exceptions/domain-exceptions';
import { UserAccountMapper } from '@application/auth/mappers/user-account.mapper';
import { AccessTokenMapper } from '@application/auth/mappers/access-token.mapper';
import { GetAuthTokenUsecase } from '@application/auth/use-cases/get-auth-token.usecase';
import { GetUserUsecase } from '@application/auth/use-cases/get-user.usecase';

@ApiTags('Auth')
@Controller()
@ApiBearerAuth('JWT-auth')
export class AuthController {
    constructor(
        private readonly getAuthTokenUsecase: GetAuthTokenUsecase,
        private readonly getUserUsecase: GetUserUsecase,
        // Mappers
        private readonly userAccountMapper: UserAccountMapper,
        private readonly accessTokenMapper: AccessTokenMapper,
    ) {}

    @Public()
    @Post('login')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Authenticate user and get tokens' })
    @ApiResponse({
        status: HttpStatus.OK,
        description:
            'User successfully authenticated. Returns access token, refresh token, and user data.',
    })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Invalid credentials' })
    async login(@Body() loginDto: LoginDto) {
        try {
            const result = await this.getAuthTokenUsecase.query(loginDto);
            return this.accessTokenMapper.toResponse(result.getValue());
        } catch (e) {
            throw new AuthenticationException(e.message);
        }
    }

    @Get('users/:user_id')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Get current user logged' })
    async getUser(@Param('user_id') userId: string) {
        try {
            const result = await this.getUserUsecase.query(userId);
            return this.userAccountMapper.toResponse(result.getValue());
        } catch (e) {
            throw new BadRequestException(e.message);
        }
    }
}
