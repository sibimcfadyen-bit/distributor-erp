-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "shelfLifeDays" INTEGER,
ADD COLUMN     "trackBatch" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "trackMfgDate" BOOLEAN NOT NULL DEFAULT true;
