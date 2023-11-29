/*
  Warnings:

  - You are about to drop the column `transactionId` on the `ExpenseCategory` table. All the data in the column will be lost.
  - You are about to drop the column `transactCategory` on the `Transaction` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ExpenseCategory" DROP CONSTRAINT "ExpenseCategory_transactionId_fkey";

-- DropIndex
DROP INDEX "ExpenseCategory_transactionId_key";

-- AlterTable
ALTER TABLE "ExpenseCategory" DROP COLUMN "transactionId";

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "transactCategory",
ADD COLUMN     "expenseCategoryId" INTEGER,
ADD COLUMN     "transactionCategory" "TransactionCategory" NOT NULL DEFAULT 'sendmoney';

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_expenseCategoryId_fkey" FOREIGN KEY ("expenseCategoryId") REFERENCES "ExpenseCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;
