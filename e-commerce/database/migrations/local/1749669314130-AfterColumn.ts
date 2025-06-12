import { MigrationInterface, QueryRunner } from "typeorm";

export class AfterColumn1749669314130 implements MigrationInterface {
    name = 'AfterColumn1749669314130'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_items" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "order_items" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "order_items" ADD "deletedAt" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_items" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "order_items" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "order_items" DROP COLUMN "createdAt"`);
    }

}
