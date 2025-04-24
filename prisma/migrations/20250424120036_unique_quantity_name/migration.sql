/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Quantity` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Quantity_name_key" ON "Quantity"("name");
