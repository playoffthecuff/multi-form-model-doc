-- CreateTable
CREATE TABLE "Quantity" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Quantity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Unit" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "symbol" TEXT NOT NULL,
    "factor" DOUBLE PRECISION NOT NULL,
    "isBase" BOOLEAN NOT NULL,
    "quantityId" INTEGER NOT NULL,

    CONSTRAINT "Unit_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Unit" ADD CONSTRAINT "Unit_quantityId_fkey" FOREIGN KEY ("quantityId") REFERENCES "Quantity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
