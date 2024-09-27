/*
  Warnings:

  - Added the required column `category` to the `Assessment` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "AssessmentCategory" AS ENUM ('PRETEST', 'POSTTEST');

-- AlterTable
ALTER TABLE "Assessment" ADD COLUMN     "category" "AssessmentCategory" NOT NULL;
