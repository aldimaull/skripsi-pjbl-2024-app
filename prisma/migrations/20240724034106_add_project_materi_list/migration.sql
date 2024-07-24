-- CreateTable
CREATE TABLE "ProjectList" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL DEFAULT '',
    "description" TEXT NOT NULL,
    "deadline" TIMESTAMP(3) NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProjectList_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MateriList" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL DEFAULT '',
    "description" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MateriList_pkey" PRIMARY KEY ("id")
);
