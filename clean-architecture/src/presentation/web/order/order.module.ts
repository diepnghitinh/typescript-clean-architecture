import { Module, Provider } from '@nestjs/common';
import { OrderController } from './order.controller';

const providers: Provider[] = [];

@Module({
    imports: [],
    providers,
    controllers: [
        OrderController
    ],
})
export class WebOrderPresentationModule {}
