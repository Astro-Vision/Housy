/*
  Warnings:

  - You are about to drop the column `city` on the `property` table. All the data in the column will be lost.
  - Added the required column `area` to the `property` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `property` table without a default value. This is not possible if the table is not empty.
  - Added the required column `province` to the `property` table without a default value. This is not possible if the table is not empty.
  - Added the required column `regency` to the `property` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subdistrict` to the `property` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ward` to the `property` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "property" DROP COLUMN "city",
ADD COLUMN     "area" INTEGER NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "province" TEXT NOT NULL,
ADD COLUMN     "regency" TEXT NOT NULL,
ADD COLUMN     "subdistrict" TEXT NOT NULL,
ADD COLUMN     "ward" TEXT NOT NULL;
