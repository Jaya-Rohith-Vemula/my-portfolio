/*
  Warnings:

  - A unique constraint covering the columns `[publicId]` on the table `Portfolio` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `publicId` to the `Portfolio` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Portfolio" ADD COLUMN     "publicId" VARCHAR(6) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Portfolio_publicId_key" ON "Portfolio"("publicId");
