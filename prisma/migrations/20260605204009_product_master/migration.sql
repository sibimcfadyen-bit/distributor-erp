/*
  Warnings:

  - Added the required column `distributorRate` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hsnCode` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mrp` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reorderLevel` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `retailerRate` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "distributorRate" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "hsnCode" TEXT NOT NULL,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "mrp" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "reorderLevel" INTEGER NOT NULL,
ADD COLUMN     "retailerRate" DOUBLE PRECISION NOT NULL;
