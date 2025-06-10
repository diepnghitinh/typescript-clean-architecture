import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderController } from './order.controller';
import { CreateOrderUseCase } from '@application/order/use-cases/create-order.use-case';
import { UpdateOrderUseCase } from '@application/order/use-cases/update-order.use-case';
import { GetOrderUseCase } from '@application/order/use-cases/get-order.use-case';
import { ListOrdersUseCase } from '@application/order/use-cases/list-orders.use-case';
import { CancelOrderUseCase } from '@application/order/use-cases/cancel-order.use-case';
import { OrderRepository } from '@infrastructure/order/repositories/order.repository';
import { Order } from '@infrastructure/order/entities/order.entity';
import { OrderItem } from '@infrastructure/order/entities/order-item.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Order, OrderItem]),
    ],
    providers: [
        CreateOrderUseCase,
        UpdateOrderUseCase,
        GetOrderUseCase,
        ListOrdersUseCase,
        CancelOrderUseCase,
        OrderRepository,
    ],
    controllers: [OrderController],
})
export class WebOrderPresentationModule {}
