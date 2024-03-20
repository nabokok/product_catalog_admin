/*
  Warnings:

  - You are about to drop the `product_details` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `description` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `processor` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `resolution` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "product_details" DROP CONSTRAINT "product_details_productId_fkey";

-- AlterTable
ALTER TABLE "products" ADD COLUMN     "capacityAvailable" TEXT[],
ADD COLUMN     "cell" TEXT[],
ADD COLUMN     "colorsAvailable" TEXT[],
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "processor" TEXT NOT NULL,
ADD COLUMN     "resolution" TEXT NOT NULL;

-- DropTable
DROP TABLE "product_details";
