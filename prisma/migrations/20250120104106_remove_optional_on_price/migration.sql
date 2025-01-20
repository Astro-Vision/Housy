/*
  Warnings:

  - Made the column `price` on table `booking` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "booking" ALTER COLUMN "price" SET NOT NULL;
