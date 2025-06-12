import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { IOrderRepository } from '@application/order/repositories/order.repository';
import { OrderEntity } from '@application/order/domain/entities/order.entity';
import { OrderStatus } from '@application/order/domain/entities/order.props';
import { BaseRepository } from '@core/infrastructure/database/typeorm/base/repository.base';
import { OrderOrmEntity } from '@infrastructure/order/entities/order.orm.entity';
import { plainToClassFromExist } from 'class-transformer';

@Injectable()
export class OrderRepository
    extends BaseRepository<OrderEntity, OrderOrmEntity>
    implements IOrderRepository
{
    constructor(dataSource: DataSource) {
        super(OrderOrmEntity, dataSource);
    }

    async findById(id: string): Promise<OrderEntity | any> {
        // const order = await this.repository.findOne({
        //     where: { id },
        //     relations: ['items'],
        // });
        //
        // if (!order) return null;
        //
        // return OrderEntity.create(
        //     {
        //         customerId: order.customerId,
        //         items: order.items.map((item) => ({
        //             productId: item.productId,
        //             quantity: item.quantity,
        //             price: item.price,
        //         })),
        //         status: order.status as OrderStatus,
        //         totalAmount: order.totalAmount,
        //         shippingAddress: order.shippingAddress,
        //         paymentMethod: order.paymentMethod,
        //         createdAt: order.createdAt,
        //         updatedAt: order.updatedAt,
        //     },
        //     new UniqueEntityID(order.id),
        // ).getValue();
    }

    async findByCustomerId(customerId: string): Promise<OrderEntity[] | any> {
        // const orders = await this.repository.find({
        //     where: { customerId },
        //     relations: ['items'],
        // });
        //
        // return orders.map((order) =>
        //     OrderEntity.create(
        //         {
        //             customerId: order.customerId,
        //             items: order.items.map((item) => ({
        //                 productId: item.productId,
        //                 quantity: item.quantity,
        //                 price: item.price,
        //             })),
        //             status: order.status as OrderStatus,
        //             totalAmount: order.totalAmount,
        //             shippingAddress: order.shippingAddress,
        //             paymentMethod: order.paymentMethod,
        //             createdAt: order.createdAt,
        //             updatedAt: order.updatedAt,
        //         },
        //         new UniqueEntityID(order.id),
        //     ).getValue(),
        // );
    }

    async findByStatus(status: OrderStatus): Promise<OrderEntity[] | any> {
        // const orders = await this.repository.find({
        //     where: { status },
        //     relations: ['items'],
        // });
        //
        // return orders.map((order) =>
        //     OrderEntity.create(
        //         {
        //             customerId: order.customerId,
        //             items: order.items.map((item) => ({
        //                 productId: item.productId,
        //                 quantity: item.quantity,
        //                 price: item.price,
        //             })),
        //             status: order.status as OrderStatus,
        //             totalAmount: order.totalAmount,
        //             shippingAddress: order.shippingAddress,
        //             paymentMethod: order.paymentMethod,
        //             createdAt: order.createdAt,
        //             updatedAt: order.updatedAt,
        //         },
        //         new UniqueEntityID(order.id),
        //     ).getValue(),
        // );
    }

    async findAll(): Promise<OrderEntity[] | any> {
        // const orders = await this.repository.find({
        //     relations: ['items'],
        // });
        //
        // return orders.map((order) =>
        //     OrderEntity.create(
        //         {
        //             customerId: order.customerId,
        //             items: order.items.map((item) => ({
        //                 productId: item.productId,
        //                 quantity: item.quantity,
        //                 price: item.price,
        //             })),
        //             status: order.status as OrderStatus,
        //             totalAmount: order.totalAmount,
        //             shippingAddress: order.shippingAddress,
        //             paymentMethod: order.paymentMethod,
        //             createdAt: order.createdAt,
        //             updatedAt: order.updatedAt,
        //         },
        //         new UniqueEntityID(order.id),
        //     ).getValue(),
        // );
    }

    async save(order: OrderEntity): Promise<void> {
        const ormEntity = this.toOrmEntity(order);
        const orderData = this.repository.create(ormEntity);
        await this.repository.save(orderData);
    }

    async update(order: OrderEntity): Promise<void> {
        // await this.orderRepository.update(
        //     { id: order.id.toString() },
        //     {
        //         status: order.status,
        //         totalAmount: order.totalAmount,
        //         shippingAddress: order.shippingAddress,
        //         paymentMethod: order.paymentMethod,
        //         updatedAt: new Date(),
        //     },
        // );
        //
        // // Delete existing items
        // await this.orderItemRepository.delete({ orderId: order.id.toString() });
        //
        // // Create new items
        // const orderItems = order.items.map((item) =>
        //     this.orderItemRepository.create({
        //         orderId: order.id.toString(),
        //         productId: item.productId,
        //         quantity: item.quantity,
        //         price: item.price,
        //     }),
        // );
        //
        // await this.orderItemRepository.save(orderItems);
    }

    async delete(id: string): Promise<void> {
        await this.repository.delete({ id });
    }

    toDomain(ormEntity: any): Promise<OrderEntity> {
        return Promise.resolve(undefined);
    }

    toOrmEntity(domainEntity: OrderEntity): any {
        const order = new OrderOrmEntity();

        return plainToClassFromExist(order, {
            ...domainEntity.props,
            id: domainEntity.id.toString(),
            items: domainEntity.props.items.map((item) => {
                return item.props;
            }),
        });
    }
}
