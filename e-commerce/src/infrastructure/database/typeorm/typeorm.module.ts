import { Global, Module, Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmReportModuleOptions } from './typeorm.options';
import { dataSourceRepository } from '@core/infrastructure/database';
import { DataSource } from 'typeorm';

// Repositories
import { IUserRepository } from '@application/auth/repositories/user.repository';
import { UserRepository } from '@infrastructure/auth/repositories/user.repository';
import { IOrderRepository } from '@application/order/repositories/order.repository';
import { OrderRepository } from '@infrastructure/order/repositories/order.repository';
import { IProductRepository } from '@application/product/repositories/product.repository';
import { ProductRepository } from '@infrastructure/product/repositories/product.repository';
import { IEventStoreRepository } from '@infrastructure/eventstore/repositories/event-store.responsity.interface';
import { EventStoreRepository } from '@infrastructure/eventstore/repositories/event-store.repository';

export const RepositoryProviders: Provider[] = [
    {
        provide: IUserRepository,
        useClass: UserRepository,
    },
    {
        provide: IOrderRepository,
        useClass: OrderRepository,
    },
    {
        provide: IProductRepository,
        useClass: ProductRepository,
    },

    // Event souring
    {
        provide: IEventStoreRepository,
        useClass: EventStoreRepository,
    }
];

@Global()
@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) =>
                typeOrmReportModuleOptions(configService),
            dataSourceFactory: async (options: any) => {
                const dataSource = await new DataSource(options).initialize();
                dataSourceRepository.addDataSource(
                    options.host ?? options?.replication?.master?.host,
                    dataSource,
                );
                return dataSource;
            },
        }),
    ],
    providers: [...RepositoryProviders],
    exports: [...RepositoryProviders],
})
export class TypeOrmInfrastructureModule {}
