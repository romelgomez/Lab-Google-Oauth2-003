/*
  Warnings:

  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - Added the required column `updated` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "name",
ADD COLUMN     "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deleted" TIMESTAMP(3),
ADD COLUMN     "displayName" TEXT,
ADD COLUMN     "familyName" TEXT,
ADD COLUMN     "givenName" TEXT,
ADD COLUMN     "updated" TIMESTAMP(3) NOT NULL;
