import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from '@shared/decorators';
import { CreateOrderUseCase } from '@application/order/use-cases/create-order.use-case';
import { UpdateOrderUseCase } from '@application/order/use-cases/update-order.use-case';
import { GetOrderUseCase } from '@application/order/use-cases/get-order.use-case';
import { ListOrdersUseCase } from '@application/order/use-cases/list-orders.use-case';
import { CancelOrderUseCase } from '@application/order/use-cases/cancel-order.use-case';
import { CreateOrderDTO } from '@application/order/dtos/create-order.dto';
import { UpdateOrderDTO } from '@application/order/dtos/update-order.dto';
import { OrderStatus } from '@application/order/domain/entities/order.props';
import { ApiAuthBearerGuard } from '@core/presentation/guards/auth-bearer.guard';

@ApiTags('Orders')
@Controller()
@ApiBearerAuth('JWT-auth')
@UseGuards(ApiAuthBearerGuard)
export class OrderController {
    constructor(
        private readonly createOrderUseCase: CreateOrderUseCase,
        private readonly updateOrderUseCase: UpdateOrderUseCase,
        private readonly getOrderUseCase: GetOrderUseCase,
        private readonly listOrdersUseCase: ListOrdersUseCase,
        private readonly cancelOrderUseCase: CancelOrderUseCase,
    ) {}

    @Public()
    @Post()
    @ApiOperation({ summary: 'Create a new order' })
    @ApiResponse({ status: 201, description: 'Order created successfully' })
    @ApiResponse({ status: 400, description: 'Invalid input data' })
    async create(@Body() createOrderDto: CreateOrderDTO) {
        return this.createOrderUseCase.execute(createOrderDto);
    }

    @Public()
    @Get()
    @ApiOperation({ summary: 'List all orders' })
    @ApiResponse({ status: 200, description: 'Returns list of orders' })
    async findAll(
        @Query('customerId') customerId?: string,
        @Query('status') status?: OrderStatus,
    ) {
        return this.listOrdersUseCase.execute(customerId, status);
    }

    @Public()
    @Get(':id')
    @ApiOperation({ summary: 'Get order by ID' })
    @ApiResponse({ status: 200, description: 'Returns the order' })
    @ApiResponse({ status: 404, description: 'Order not found' })
    async findOne(@Param('id') id: string) {
        return this.getOrderUseCase.execute(id);
    }

    @Public()
    @Put(':id')
    @ApiOperation({ summary: 'Update order' })
    @ApiResponse({ status: 200, description: 'Order updated successfully' })
    @ApiResponse({ status: 404, description: 'Order not found' })
    async update(
        @Param('id') id: string,
        @Body() updateOrderDto: UpdateOrderDTO,
    ) {
        return this.updateOrderUseCase.execute(id, updateOrderDto);
    }

    @Public()
    @Post(':id/cancel')
    @ApiOperation({ summary: 'Cancel order' })
    @ApiResponse({ status: 200, description: 'Order cancelled successfully' })
    @ApiResponse({ status: 404, description: 'Order not found' })
    @ApiResponse({ status: 400, description: 'Cannot cancel order' })
    async cancel(@Param('id') id: string) {
        return this.cancelOrderUseCase.execute(id);
    }
}
