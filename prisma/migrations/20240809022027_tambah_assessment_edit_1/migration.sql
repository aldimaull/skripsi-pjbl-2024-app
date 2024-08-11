/*
  Warnings:

  - You are about to drop the column `answer` on the `Response` table. All the data in the column will be lost.
  - Added the required column `selectedOption` to the `Response` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Question" ADD COLUMN     "options" TEXT[];

-- AlterTable
ALTER TABLE "Response" DROP COLUMN "answer",
ADD COLUMN     "selectedOption" TEXT NOT NULL;
