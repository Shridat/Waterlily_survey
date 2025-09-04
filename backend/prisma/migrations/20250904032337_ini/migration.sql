/*
  Warnings:

  - You are about to drop the column `createdAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Resposnses` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Resposnses" DROP CONSTRAINT "Resposnses_questionId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Resposnses" DROP CONSTRAINT "Resposnses_userId_fkey";

-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "createdAt",
ADD COLUMN     "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- DropTable
DROP TABLE "public"."Resposnses";

-- CreateTable
CREATE TABLE "public"."Responses" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "questionId" INTEGER NOT NULL,
    "value" TEXT NOT NULL,
    "submittedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Responses_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Responses_userId_idx" ON "public"."Responses"("userId");

-- CreateIndex
CREATE INDEX "Responses_questionId_idx" ON "public"."Responses"("questionId");

-- CreateIndex
CREATE UNIQUE INDEX "Responses_userId_questionId_key" ON "public"."Responses"("userId", "questionId");

-- AddForeignKey
ALTER TABLE "public"."Responses" ADD CONSTRAINT "Responses_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Responses" ADD CONSTRAINT "Responses_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "public"."Questions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
