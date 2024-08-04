/*
  Warnings:

  - You are about to drop the column `description` on the `ProjectList` table. All the data in the column will be lost.
  - You are about to drop the `Project` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_userId_fkey";

-- AlterTable
ALTER TABLE "ProjectList" DROP COLUMN "description";

-- DropTable
DROP TABLE "Project";

-- CreateTable
CREATE TABLE "TookProject" (
    "projectId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "deadlineFrom" TIMESTAMP(3) NOT NULL,
    "deadlineTo" TIMESTAMP(3) NOT NULL,
    "submission" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TookProject_pkey" PRIMARY KEY ("projectId","userId")
);

-- AddForeignKey
ALTER TABLE "TookProject" ADD CONSTRAINT "TookProject_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "ProjectList"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TookProject" ADD CONSTRAINT "TookProject_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
