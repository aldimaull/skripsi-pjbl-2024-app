/*
  Warnings:

  - You are about to drop the column `code` on the `TookProject` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "TookProject" DROP COLUMN "code",
ALTER COLUMN "submission" DROP NOT NULL;
