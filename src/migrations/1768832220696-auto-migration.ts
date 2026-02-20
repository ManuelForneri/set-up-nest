import { MigrationInterface, QueryRunner } from "typeorm";

export class AutoMigration1768832220696 implements MigrationInterface {
    name = 'AutoMigration1768832220696'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "favouritePokemon" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "favouritePokemon"`);
    }

}
