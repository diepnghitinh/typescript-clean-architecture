import { MigrationInterface, QueryRunner } from "typeorm";

export class RenameColumn1749668186571 implements MigrationInterface {
    name = 'RenameColumn1749668186571'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "orderDate"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "status" SET DEFAULT 'PENDING'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "status" SET DEFAULT 'PLACED'`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "orderDate" TIMESTAMP NOT NULL DEFAULT now()`);
    }

}
