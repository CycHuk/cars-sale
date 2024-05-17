/*
  Warnings:

  - Made the column `name` on table `Car` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Car` MODIFY `name` VARCHAR(191) NOT NULL;
