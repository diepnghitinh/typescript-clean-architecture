import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { CreateOrderUseCase } from '@application/order/use-cases/create-order.use-case';
import { ListOrdersUseCase } from '@application/order/use-cases/list-orders.use-case';
import { OrderRepository } from '@infrastructure/order/repositories/order.repository';
import { OrderCreatedMapper } from '@application/order/mappers/order-created.mapper';

@Module({
    imports: [],
    providers: [CreateOrderUseCase, ListOrdersUseCase, OrderRepository, OrderCreatedMapper],
    controllers: [OrderController],
})
export class WebOrderPresentationModule {}
