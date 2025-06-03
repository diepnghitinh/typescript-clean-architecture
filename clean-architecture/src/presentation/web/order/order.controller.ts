import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('order')
@ApiTags('Orders')
export class OrderController {
    constructor(
    ) {}

    @Get()
    findAll(
    ) {
      return "find all"
    }
}
