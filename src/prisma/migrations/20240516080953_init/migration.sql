/*
  Warnings:

  - You are about to drop the column `modelId` on the `Car` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Listing` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Model` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[phoneNumber]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `phoneNumber` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Car` DROP FOREIGN KEY `Car_modelId_fkey`;

-- DropForeignKey
ALTER TABLE `Listing` DROP FOREIGN KEY `Listing_carId_fkey`;

-- DropForeignKey
ALTER TABLE `Model` DROP FOREIGN KEY `Model_brandId_fkey`;

-- DropIndex
DROP INDEX `User_email_key` ON `User`;

-- AlterTable
ALTER TABLE `Car` DROP COLUMN `modelId`;

-- AlterTable
ALTER TABLE `Listing` DROP COLUMN `updatedAt`;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `email`,
    ADD COLUMN `phoneNumber` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `Category`;

-- DropTable
DROP TABLE `Model`;

-- CreateIndex
CREATE UNIQUE INDEX `User_phoneNumber_key` ON `User`(`phoneNumber`);
