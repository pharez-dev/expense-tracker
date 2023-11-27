/*
  Warnings:

  - Added the required column `amount` to the `Transactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `balance` to the `Transactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `recipient` to the `Transactions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Transactions" ADD COLUMN     "amount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "balance" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "recipient" TEXT NOT NULL;
