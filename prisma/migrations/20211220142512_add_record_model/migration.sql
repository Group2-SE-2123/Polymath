/*
  Warnings:

  - You are about to drop the column `userId` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the `Score` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `details` to the `Quiz` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timeLimit` to the `Quiz` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_userId_fkey";

-- DropForeignKey
ALTER TABLE "Score" DROP CONSTRAINT "Score_userId_fkey";

-- AlterTable
ALTER TABLE "Question" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "Quiz" ADD COLUMN     "details" TEXT NOT NULL,
ADD COLUMN     "timeLimit" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Score";

-- CreateTable
CREATE TABLE "Record" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "quizId" INTEGER NOT NULL,
    "score" INTEGER NOT NULL,
    "time" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Record_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Record" ADD CONSTRAINT "Record_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Record" ADD CONSTRAINT "Record_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "Quiz"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
