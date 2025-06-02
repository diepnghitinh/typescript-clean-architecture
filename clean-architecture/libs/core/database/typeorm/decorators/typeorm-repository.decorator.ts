export const TYPEORM_REPOSITORY_METADATA = 'TYPEORM_REPOSITORY_METADATA';

export function TypeOrmRepository(entity: Function): ClassDecorator {
	return function (target: Function) {
		target.prototype.entity = entity;
		Reflect.defineMetadata(TYPEORM_REPOSITORY_METADATA, entity, target);
	};
}
