/*
  Warnings:

  - You are about to drop the column `availble` on the `Book` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Book` DROP COLUMN `availble`,
    ADD COLUMN `status` BOOLEAN NOT NULL DEFAULT true;
