/*
  Warnings:

  - You are about to drop the column `species` on the `Tree` table. All the data in the column will be lost.
  - Added the required column `specie` to the `Tree` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Tree" DROP COLUMN "species",
ADD COLUMN     "specie" TEXT NOT NULL;
