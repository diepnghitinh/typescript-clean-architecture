import { ClassProvider, DynamicModule, Global, Module, Provider } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { TYPEORM_REPOSITORY_METADATA } from './decorators';

@Module({})
@Global()
export class TypeORMRepositoryModule {
	public static forFeature(repositories: ClassProvider[]): DynamicModule {
		const providers: Provider[] = repositories.map(({ provide, useClass }) => {
			return {
				provide: provide,
				useFactory: (dataSource: DataSource) => {
					const entity = Reflect.getMetadata(TYPEORM_REPOSITORY_METADATA, useClass);

					return new useClass(entity, dataSource);
				},
				inject: [DataSource],
			};
		});
		return {
			module: TypeORMRepositoryModule,
			global: true,
			providers,
			exports: providers,
		};
	}
}
