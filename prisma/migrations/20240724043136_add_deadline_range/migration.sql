/*
  Warnings:

  - Added the required column `deadlineFrom` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deadlineTo` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "deadlineFrom" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "deadlineTo" TIMESTAMP(3) NOT NULL;
