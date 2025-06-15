import { Module } from '@nestjs/common';
import { ApplicationOrderModule } from './order/order.module';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
    imports: [
        CqrsModule.forRoot(),
        
        // Modules
        ApplicationOrderModule,
    ],
})
export class ApplicationModule {}
