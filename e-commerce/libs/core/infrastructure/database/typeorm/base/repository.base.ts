import { DataSource, EntityTarget, Repository } from "typeorm";

export abstract class BaseRepository<Entity, OrmEntity> {

    protected entity: EntityTarget<OrmEntity>;
    protected dataSource: DataSource;
    protected repository: Repository<OrmEntity>;
    protected alias: string;

    constructor(
        entity: EntityTarget<OrmEntity>,
        dataSource: DataSource,
    ) {
        this.entity = entity;
        this.dataSource = dataSource;
        this.repository = dataSource.getRepository(entity);
        this.alias = (entity as any)?.name;
    }

    abstract toDomain(ormEntity: any): Promise<Entity>;
    abstract toOrmEntity(domainEntity: Entity): any;
}