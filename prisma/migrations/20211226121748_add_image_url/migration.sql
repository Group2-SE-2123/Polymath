/*
  Warnings:

  - Added the required column `imageUrl` to the `Quiz` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Quiz" ADD COLUMN     "imageUrl" TEXT NOT NULL;
