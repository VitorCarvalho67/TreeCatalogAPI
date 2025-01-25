/*
  Warnings:

  - You are about to drop the `tree` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "tree";

-- CreateTable
CREATE TABLE "Tree" (
    "id" TEXT NOT NULL,
    "tag" TEXT NOT NULL,
    "species" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "height" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tree_pkey" PRIMARY KEY ("id")
);
