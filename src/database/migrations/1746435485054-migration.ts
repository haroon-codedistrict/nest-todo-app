import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1746435485054 implements MigrationInterface {
    name = 'Migration1746435485054';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "tasks" ALTER COLUMN "due_date" DROP NOT NULL`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "tasks" ALTER COLUMN "due_date" SET NOT NULL`,
        );
    }
}
