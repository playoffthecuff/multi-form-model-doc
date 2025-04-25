-- DropForeignKey
ALTER TABLE "Unit" DROP CONSTRAINT "Unit_quantityId_fkey";

-- AddForeignKey
ALTER TABLE "Unit" ADD CONSTRAINT "Unit_quantityId_fkey" FOREIGN KEY ("quantityId") REFERENCES "Quantity"("id") ON DELETE CASCADE ON UPDATE CASCADE;
