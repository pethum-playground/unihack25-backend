/*
  Warnings:

  - A unique constraint covering the columns `[contractAddress]` on the table `contracts` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "contracts" ADD COLUMN     "contractAddress" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "contracts_contractAddress_key" ON "contracts"("contractAddress");
