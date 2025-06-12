import { MigrationInterface, QueryRunner } from "typeorm";

export class RenameColumn1749668236254 implements MigrationInterface {
    name = 'RenameColumn1749668236254'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "deletedAt" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "createdAt"`);
    }

}
