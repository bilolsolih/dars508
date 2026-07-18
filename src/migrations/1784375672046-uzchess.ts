import { MigrationInterface, QueryRunner } from "typeorm";

export class Uzchess1784375672046 implements MigrationInterface {
    name = 'Uzchess1784375672046'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bookCategories" ALTER COLUMN "title" TYPE VARCHAR(96)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`ALTER TABLE "bookCategories"
        ALTER COLUMN "title" TYPE VARCHAR(64)`);
    }

}
