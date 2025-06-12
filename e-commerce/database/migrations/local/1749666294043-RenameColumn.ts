import { MigrationInterface, QueryRunner } from "typeorm";

export class RenameColumn1749666294043 implements MigrationInterface {
    name = 'RenameColumn1749666294043'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "chk_products_stock_non_negative"`);
        await queryRunner.query(`ALTER TABLE "orders" RENAME COLUMN "totalAmount" TO "totalPrice"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" RENAME COLUMN "totalPrice" TO "totalAmount"`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "chk_products_stock_non_negative" CHECK ((stock >= 0))`);
    }

}
