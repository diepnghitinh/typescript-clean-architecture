import { Body, Controller, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateOrderUseCase } from '@application/order/use-cases/create-order.use-case';
import { ListOrdersUseCase } from '@application/order/use-cases/list-orders.use-case';
import { CreateOrderDTO } from '@application/order/dtos/create-order.dto';

// Guards & Decorators
import { CurrentUser } from '@shared/decorators/current-user.decorator';
import { IJwtPayload } from '@application/auth/dtos/user.response.dto';

// Command

@ApiTags('Orders')
@Controller()
@ApiBearerAuth('JWT-auth')
export class OrderController {
    constructor(
        private readonly createOrderUseCase: CreateOrderUseCase,
        private readonly listOrdersUseCase: ListOrdersUseCase,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create a new order' })
    @ApiResponse({ status: 201, description: 'Order created successfully' })
    @ApiResponse({ status: 400, description: 'Invalid input data' })
    async create(@CurrentUser() user: IJwtPayload, @Body() createOrderDto: CreateOrderDTO) {
        return this.createOrderUseCase.execute(user.user_id, createOrderDto);
    }

    // @Public()
    // @Get()
    // @ApiOperation({ summary: 'List all orders' })
    // @ApiResponse({ status: 200, description: 'Returns list of orders' })
    // async findAll(@Query('customerId') customerId?: string, @Query('status') status?: OrderStatus) {
    //     return this.listOrdersUseCase.execute(customerId, status);
    // }
    //
    // @Public()
    // @Get(':id')
    // @ApiOperation({ summary: 'Get order by ID' })
    // @ApiResponse({ status: 200, description: 'Returns the order' })
    // @ApiResponse({ status: 404, description: 'Order not found' })
    // async findOne(@Param('id') id: string) {
    //     return this.getOrderUseCase.execute(id);
    // }
    //
    // @Public()
    // @Put(':id')
    // @ApiOperation({ summary: 'Update order' })
    // @ApiResponse({ status: 200, description: 'Order updated successfully' })
    // @ApiResponse({ status: 404, description: 'Order not found' })
    // async update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDTO) {
    //     return this.updateOrderUseCase.execute(id, updateOrderDto);
    // }
    //
    // @Public()
    // @Post(':id/cancel')
    // @ApiOperation({ summary: 'Cancel order' })
    // @ApiResponse({ status: 200, description: 'Order cancelled successfully' })
    // @ApiResponse({ status: 404, description: 'Order not found' })
    // @ApiResponse({ status: 400, description: 'Cannot cancel order' })
    // async cancel(@Param('id') id: string) {
    //     return this.cancelOrderUseCase.execute(id);
    // }
}
