/*
  Warnings:

  - Added the required column `rencana` to the `TookProject` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TookProject" ADD COLUMN     "rencana" TEXT NOT NULL;
