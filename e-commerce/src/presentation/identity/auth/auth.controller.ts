import { LoginDto } from '@application/auth/dtos/login.dto';
import { Public } from '@core/decorators/public.decorator';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';


@ApiTags('Auth')
@Controller()
export class AuthController {
  constructor(
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
    return loginDto;
  }

}