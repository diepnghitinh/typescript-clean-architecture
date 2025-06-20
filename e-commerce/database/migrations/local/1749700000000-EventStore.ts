import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class EventStore1749700000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "core_event_store",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "uuid",
          },
          {
            name: "aggregate_id",
            type: "uuid",
          },
          {
            name: "aggregate_type",
            type: "varchar",
          },
          {
            name: "event_type",
            type: "varchar",
          },
          {
            name: "event_data",
            type: "jsonb",
          },
          {
            name: "version",
            type: "int",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("event_store");
  }
} 