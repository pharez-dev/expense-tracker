/*
  Warnings:

  - A unique constraint covering the columns `[subCategory]` on the table `ExpenseCategory` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ExpenseCategory_subCategory_key" ON "ExpenseCategory"("subCategory");
