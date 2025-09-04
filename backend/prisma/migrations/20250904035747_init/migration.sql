/*
  Warnings:

  - You are about to drop the `Responses` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Responses" DROP CONSTRAINT "Responses_questionId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Responses" DROP CONSTRAINT "Responses_userId_fkey";

-- DropTable
DROP TABLE "public"."Responses";

-- CreateTable
CREATE TABLE "public"."Resposnses" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "questionId" INTEGER NOT NULL,
    "value" TEXT NOT NULL,
    "submittedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Resposnses_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Resposnses_userId_idx" ON "public"."Resposnses"("userId");

-- CreateIndex
CREATE INDEX "Resposnses_questionId_idx" ON "public"."Resposnses"("questionId");

-- CreateIndex
CREATE UNIQUE INDEX "Resposnses_userId_questionId_key" ON "public"."Resposnses"("userId", "questionId");

-- AddForeignKey
ALTER TABLE "public"."Resposnses" ADD CONSTRAINT "Resposnses_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Resposnses" ADD CONSTRAINT "Resposnses_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "public"."Questions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
