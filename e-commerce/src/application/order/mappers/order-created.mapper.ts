import { Injectable } from '@nestjs/common';
import { Mapper } from '@core/infrastructure/mapper';
import { AccessTokenResponseDto } from '@application/auth/dtos/auth-token.response.dto';
import { OrderEntity } from '../domain/entities/order.entity';
import { OrderCreatedResponseDto } from '../dtos/order-created.response.dto';

@Injectable()
export class OrderCreatedMapper implements Mapper<OrderEntity, any, OrderCreatedResponseDto> {
    public toResponse(entity: OrderEntity): OrderCreatedResponseDto {
        return {
           id: entity.id.toString(),
           totalPrice: entity.totalPrice,
        };
    }

    toDomain(record: any): OrderEntity {
        return undefined;
    }

    toPersistence(entity: OrderEntity): any {
        return undefined;
    }
}
