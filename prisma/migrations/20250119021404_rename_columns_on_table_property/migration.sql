/*
  Warnings:

  - You are about to drop the column `subdistrict` on the `property` table. All the data in the column will be lost.
  - You are about to drop the column `ward` on the `property` table. All the data in the column will be lost.
  - Added the required column `district` to the `property` table without a default value. This is not possible if the table is not empty.
  - Added the required column `village` to the `property` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "property" DROP COLUMN "subdistrict",
DROP COLUMN "ward",
ADD COLUMN     "district" TEXT NOT NULL,
ADD COLUMN     "village" TEXT NOT NULL;
