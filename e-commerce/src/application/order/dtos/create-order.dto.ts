import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

class OrderItemDTO {
    @ApiProperty({
        example: 'e12e3b4c-5d6e-7f8a-9b0c-1d2e3f4a5b6c',
    })
    @IsString()
    @IsNotEmpty()
    productId: string;

    @ApiProperty({
        example: '1',
    })
    @IsNumber()
    @IsNotEmpty()
    quantity: number;
}

export class CreateOrderDTO {
    @ApiProperty({ type: [OrderItemDTO] })
    @IsArray()
    @IsNotEmpty()
    items: OrderItemDTO[];

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    shippingAddress: string;

    @ApiProperty({ example: 'paypal' })
    @IsString()
    @IsNotEmpty()
    paymentMethod: string;

    public static create(props: {
        items: { productId: string; quantity: number }[];
        shippingAddress: string;
        paymentMethod: string;
    }): CreateOrderDTO {
        const dto = new CreateOrderDTO();
        dto.items = props.items.map(item => {
            const orderItem = new OrderItemDTO();
            orderItem.productId = item.productId;
            orderItem.quantity = item.quantity;
            return orderItem;
        });
        dto.shippingAddress = props.shippingAddress;
        dto.paymentMethod = props.paymentMethod;
        return dto;
    }
}
