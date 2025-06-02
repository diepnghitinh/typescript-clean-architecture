import { DataSource } from 'typeorm';

export class DataSourceRepository {
    private dataSources: Map<string, DataSource> = new Map();

    private defaultDataSource: DataSource;

    public addDataSource(host: string, dataSource: DataSource) {
        if (!host) return;
        this.dataSources.set(host, dataSource);
        if (!this.defaultDataSource) {
            this.defaultDataSource = dataSource;
        }
    }

    public setDefaultDataSource(dataSource: DataSource) {
        this.defaultDataSource = dataSource;
    }

    public getDataSource(host?: string) {
        return this.dataSources.get(host) ?? this.defaultDataSource;
    }

    public getDataSources() {
        return Object.values(this.dataSources);
    }
}

export const dataSourceRepository = new DataSourceRepository();
