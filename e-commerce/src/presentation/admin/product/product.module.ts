import { Module, Provider } from '@nestjs/common';
import { ProductController } from './product.controller';

const providers: Provider[] = [];

@Module({
    imports: [],
    providers,
    controllers: [
        ProductController
    ],
})
export class AdminProductPresentationModule {}
