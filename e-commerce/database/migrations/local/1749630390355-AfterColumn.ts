import { MigrationInterface, QueryRunner } from "typeorm";

export class AfterColumn1749630390355 implements MigrationInterface {
    name = 'AfterColumn1749630390355'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" ADD "deletedAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "status" SET DEFAULT 'PLACED'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "status" SET DEFAULT 'PENDING'`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "deletedAt"`);
    }

}
