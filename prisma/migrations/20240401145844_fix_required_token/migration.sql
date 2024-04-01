/*
  Warnings:

  - Made the column `token` on table `PyShopToken` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "PyShopToken" ALTER COLUMN "token" SET NOT NULL;
