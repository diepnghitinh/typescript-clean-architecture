import { Global, Module, Provider } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { typeOrmReportModuleOptions } from "./typeorm.options";
import { dataSourceRepository } from '@core/database';
import { DataSource } from "typeorm";

export const RepositoryProviders: Provider[] = [
]

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
    providers: [...RepositoryProviders,],
    exports: [...RepositoryProviders,],
})
export class TypeOrmInfrastructureModule {}