import { Public } from '@core/decorators/public.decorator';
import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

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
