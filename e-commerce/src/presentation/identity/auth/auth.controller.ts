import { LoginDto } from '@application/auth/dtos/login.dto';
import { GetUserLoginUsecase } from '@application/auth/use-cases/get-user-login.usecase';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Public } from '@shared/decorators';

@ApiTags('Auth')
@Controller()
export class AuthController {
  constructor(
    private readonly getUserLoginUsecase: GetUserLoginUsecase,
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
    return this.getUserLoginUsecase.query(loginDto);
  }

}