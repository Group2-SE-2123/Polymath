/*
  Warnings:

  - You are about to drop the `User_Details` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "User_Details" DROP CONSTRAINT "User_Details_userId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "email" TEXT,
ADD COLUMN     "isAdmin" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "password" TEXT;

-- DropTable
DROP TABLE "User_Details";
