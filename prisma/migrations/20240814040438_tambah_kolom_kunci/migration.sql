/*
  Warnings:

  - Added the required column `kunci` to the `Question` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Question" ADD COLUMN     "kunci" TEXT;
UPDATE "Question" SET "kunci" = 'nilai_default' WHERE "kunci" IS NULL;
ALTER TABLE "Question" ALTER COLUMN "kunci" SET NOT NULL;
