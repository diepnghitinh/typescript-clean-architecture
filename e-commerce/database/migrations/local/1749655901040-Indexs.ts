import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1749655901040 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE products ADD CONSTRAINT chk_products_stock_non_negative CHECK (stock >= 0)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE products DROP CONSTRAINT chk_products_stock_non_negative`);
    }

}
