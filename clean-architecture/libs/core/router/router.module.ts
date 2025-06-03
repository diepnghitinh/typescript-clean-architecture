import { DynamicModule, Module } from '@nestjs/common';
import { RouterModule, Routes } from '@nestjs/core';
import { extractModulesFromRoutes } from './helpers/';

@Module({})
export class LibRouterModule {
	public static register(routes: Routes): DynamicModule {
		return {
			module: LibRouterModule,
			global: true,
			imports: [RouterModule.register(routes), ...extractModulesFromRoutes(routes)],
			exports: [RouterModule],
		};
	}
}
