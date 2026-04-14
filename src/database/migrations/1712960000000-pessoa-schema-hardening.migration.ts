import { MigrationInterface, QueryRunner } from 'typeorm';

export class PessoaSchemaHardening1712960000000 implements MigrationInterface {
  name = 'PessoaSchemaHardening1712960000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DO $$
      BEGIN
        IF EXISTS (
          SELECT 1
          FROM information_schema.tables
          WHERE table_schema = 'public'
            AND table_name = 'pessoa'
        ) THEN
          IF EXISTS (
            SELECT 1
            FROM information_schema.columns
            WHERE table_schema = 'public'
              AND table_name = 'pessoa'
              AND column_name = 'password'
          ) AND NOT EXISTS (
            SELECT 1
            FROM information_schema.columns
            WHERE table_schema = 'public'
              AND table_name = 'pessoa'
              AND column_name = 'password_hash'
          ) THEN
            ALTER TABLE "pessoa"
              RENAME COLUMN "password" TO "password_hash";
          END IF;

          IF NOT EXISTS (
            SELECT 1
            FROM information_schema.columns
            WHERE table_schema = 'public'
              AND table_name = 'pessoa'
              AND column_name = 'password_hash'
          ) THEN
            ALTER TABLE "pessoa"
              ADD COLUMN "password_hash" character varying(255) DEFAULT '';
          END IF;

          IF EXISTS (
            SELECT 1
            FROM information_schema.columns
            WHERE table_schema = 'public'
              AND table_name = 'pessoa'
              AND column_name = 'nome'
          ) THEN
            UPDATE "pessoa"
            SET "nome" = ''
            WHERE "nome" IS NULL;

            ALTER TABLE "pessoa"
              ALTER COLUMN "nome" SET NOT NULL;
          END IF;

          IF EXISTS (
            SELECT 1
            FROM information_schema.columns
            WHERE table_schema = 'public'
              AND table_name = 'pessoa'
              AND column_name = 'password_hash'
          ) THEN
            UPDATE "pessoa"
            SET "password_hash" = ''
            WHERE "password_hash" IS NULL;

            ALTER TABLE "pessoa"
              ALTER COLUMN "password_hash" SET NOT NULL;
          END IF;
        END IF;
      END
      $$;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DO $$
      BEGIN
        IF EXISTS (
          SELECT 1
          FROM information_schema.tables
          WHERE table_schema = 'public'
            AND table_name = 'pessoa'
        ) THEN
          IF EXISTS (
            SELECT 1
            FROM information_schema.columns
            WHERE table_schema = 'public'
              AND table_name = 'pessoa'
              AND column_name = 'password_hash'
          ) AND NOT EXISTS (
            SELECT 1
            FROM information_schema.columns
            WHERE table_schema = 'public'
              AND table_name = 'pessoa'
              AND column_name = 'password'
          ) THEN
            ALTER TABLE "pessoa"
              RENAME COLUMN "password_hash" TO "password";
          END IF;
        END IF;
      END
      $$;
    `);
  }
}
