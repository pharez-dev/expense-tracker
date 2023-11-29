/*
  Warnings:

  - You are about to drop the column `type` on the `Transaction` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "TransactionCategory" AS ENUM ('paybill', 'buygoods', 'sendmoney');

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "type",
ADD COLUMN     "transactCategory" "TransactionCategory" NOT NULL DEFAULT 'sendmoney',
ADD COLUMN     "transactionType" "TransactionType" NOT NULL DEFAULT 'DEBIT';

-- CreateTable
CREATE TABLE "ExpenseCategory" (
    "id" SERIAL NOT NULL,
    "transactionId" INTEGER NOT NULL,
    "category" TEXT NOT NULL,
    "subCategory" TEXT NOT NULL,

    CONSTRAINT "ExpenseCategory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ExpenseCategory_transactionId_key" ON "ExpenseCategory"("transactionId");

-- AddForeignKey
ALTER TABLE "ExpenseCategory" ADD CONSTRAINT "ExpenseCategory_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "Transaction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
