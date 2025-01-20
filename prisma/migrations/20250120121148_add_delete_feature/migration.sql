-- DropForeignKey
ALTER TABLE "booking" DROP CONSTRAINT "booking_propertyId_fkey";

-- DropForeignKey
ALTER TABLE "booking" DROP CONSTRAINT "booking_userId_fkey";

-- DropForeignKey
ALTER TABLE "image_property" DROP CONSTRAINT "image_property_propertyId_fkey";

-- DropForeignKey
ALTER TABLE "profile" DROP CONSTRAINT "profile_userId_fkey";

-- AddForeignKey
ALTER TABLE "profile" ADD CONSTRAINT "profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "booking" ADD CONSTRAINT "booking_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "booking" ADD CONSTRAINT "booking_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "property"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "image_property" ADD CONSTRAINT "image_property_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "property"("id") ON DELETE CASCADE ON UPDATE CASCADE;
