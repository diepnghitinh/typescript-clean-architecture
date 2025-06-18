import {
    Controller,
    Get,
    Param,
    Post,
    Body,
    Put,
    Delete,
    Patch,
    HttpCode,
    HttpStatus,
    UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';

// Guards & Decorators

// DTOs

// Queries

// Commands

@ApiTags('Products')
@Controller('')
@ApiBearerAuth('JWT-auth')
export class ProductController {
    constructor() {}

    // @Get()
    // @HttpCode(HttpStatus.OK)
    // @ApiOperation({ summary: 'Get all users (Admin only)' })
    // @ApiResponse({ status: HttpStatus.OK, description: 'Returns a list of all users' })
    // @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'User does not have admin role' })
    // async getAllUsers() {
    //   return this.queryBus.execute(new GetUsersQuery());
    // }

    // @Get(':id')
    // @HttpCode(HttpStatus.OK)
    // @ApiOperation({ summary: 'Get user by ID (Admin only)' })
    // @ApiParam({ name: 'id', description: 'User ID', example: '550e8400-e29b-41d4-a716-446655440000' })
    // @ApiResponse({ status: HttpStatus.OK, description: 'Returns user information' })
    // @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User not found' })
    // @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'User does not have admin role' })
    // async getUserById(@Param('id') id: string) {
    //   return this.queryBus.execute(new GetUserQuery(id));
    // }

    @Get()
    findAll() {
        return 'find product all';
    }
}
