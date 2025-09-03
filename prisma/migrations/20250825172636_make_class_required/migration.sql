/*
  Warnings:

  - Made the column `className` on table `File` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."File" ALTER COLUMN "className" SET NOT NULL;
