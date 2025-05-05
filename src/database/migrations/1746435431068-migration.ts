import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1746435431068 implements MigrationInterface {
    name = 'Migration1746435431068';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "directories" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "slug" character varying NOT NULL, "description" character varying NOT NULL, "created_at" bigint, "updated_at" bigint, "userIdId" integer, CONSTRAINT "CHK_21d6cd65b4b0abe90049fefa92" CHECK ("updated_at" >= 0), CONSTRAINT "CHK_45ca03ed752bb66dce551f1743" CHECK ("created_at" >= 0), CONSTRAINT "PK_d9318ce2673e948a761c266b63e" PRIMARY KEY ("id"))`,
        );
        await queryRunner.query(
            `CREATE TABLE "tasks" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "priority" integer NOT NULL, "due_date" bigint NOT NULL, "status" character varying NOT NULL, "created_at" bigint, "updated_at" bigint, "userIdId" integer, "directoryIdId" integer, CONSTRAINT "CHK_f4d628fb195c5af3467d384e0d" CHECK ("updated_at" >= 0), CONSTRAINT "CHK_fe1b18dd12848e5dbf3d52ca30" CHECK ("created_at" >= 0), CONSTRAINT "PK_8d12ff38fcc62aaba2cab748772" PRIMARY KEY ("id"))`,
        );
        await queryRunner.query(
            `CREATE TABLE "users" ("id" SERIAL NOT NULL, "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "created_at" bigint, "updated_at" bigint, CONSTRAINT "CHK_7e1289c1691ea1aad868b39c58" CHECK ("updated_at" >= 0), CONSTRAINT "CHK_571ec4e513c22df868d9c937ba" CHECK ("created_at" >= 0), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
        );
        await queryRunner.query(
            `ALTER TABLE "directories" ADD CONSTRAINT "FK_96b1c70311ff3571df2e833f3a7" FOREIGN KEY ("userIdId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE "tasks" ADD CONSTRAINT "FK_4776af095a2d88f235336aab523" FOREIGN KEY ("userIdId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE "tasks" ADD CONSTRAINT "FK_da44653ae23ad4abdb4d7adbcc5" FOREIGN KEY ("directoryIdId") REFERENCES "directories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "tasks" DROP CONSTRAINT "FK_da44653ae23ad4abdb4d7adbcc5"`,
        );
        await queryRunner.query(
            `ALTER TABLE "tasks" DROP CONSTRAINT "FK_4776af095a2d88f235336aab523"`,
        );
        await queryRunner.query(
            `ALTER TABLE "directories" DROP CONSTRAINT "FK_96b1c70311ff3571df2e833f3a7"`,
        );
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "tasks"`);
        await queryRunner.query(`DROP TABLE "directories"`);
    }
}
