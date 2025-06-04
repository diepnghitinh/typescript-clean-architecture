import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '@shared/decorators';

@Controller()
@ApiTags('Orders')
export class OrderController {
    constructor(
    ) {}

    @Public()
    @Get()
    findAll(
    ) {
      return "find all"
    }
}
