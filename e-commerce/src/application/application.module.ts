import { Module } from '@nestjs/common';
import { ApplicationOrderModule } from './order/order.module';

@Module({
    imports: [
        // Modules
        ApplicationOrderModule,
    ],
})
export class ApplicationModule {}
