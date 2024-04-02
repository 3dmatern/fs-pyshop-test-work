/*
  Warnings:

  - Made the column `name` on table `PyShopProfile` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "PyShopProfile" ALTER COLUMN "name" SET NOT NULL;
