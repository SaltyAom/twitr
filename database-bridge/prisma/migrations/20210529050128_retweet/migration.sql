/*
  Warnings:

  - You are about to drop the column `retweetUserId` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the `_retweetBy` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_retweetBy" DROP CONSTRAINT "_retweetBy_A_fkey";

-- DropForeignKey
ALTER TABLE "_retweetBy" DROP CONSTRAINT "_retweetBy_B_fkey";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "retweetUserId";

-- DropTable
DROP TABLE "_retweetBy";
