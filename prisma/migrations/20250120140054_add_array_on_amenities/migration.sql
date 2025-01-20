/*
  Warnings:

  - Changed the column `amenities` on the `property` table from a scalar field to a list field. If there are non-null values in that column, this step will fail.

*/
-- AlterTable
ALTER TABLE "property" ALTER COLUMN "amenities" SET DATA TYPE "Amenities"[];
