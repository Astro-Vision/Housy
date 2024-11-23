/*
  Warnings:

  - You are about to drop the column `image` on the `property` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "property" DROP COLUMN "image";

-- CreateTable
CREATE TABLE "image_property" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "propertyId" INTEGER NOT NULL,

    CONSTRAINT "image_property_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "image_property" ADD CONSTRAINT "image_property_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "property"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
