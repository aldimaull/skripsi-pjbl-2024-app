/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `MateriList` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `ProjectList` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "MateriList_id_key" ON "MateriList"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ProjectList_id_key" ON "ProjectList"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");
