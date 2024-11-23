/*
  Warnings:

  - You are about to drop the `image_property` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "image_property" DROP CONSTRAINT "image_property_propertyId_fkey";

-- AlterTable
ALTER TABLE "property" ADD COLUMN     "image" TEXT[];

-- DropTable
DROP TABLE "image_property";
