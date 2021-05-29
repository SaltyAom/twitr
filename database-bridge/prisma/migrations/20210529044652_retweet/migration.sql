/*
  Warnings:

  - You are about to drop the `_share` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[retweetId]` on the table `Post` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "_share" DROP CONSTRAINT "_share_A_fkey";

-- DropForeignKey
ALTER TABLE "_share" DROP CONSTRAINT "_share_B_fkey";

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "retweetId" INTEGER;

-- DropTable
DROP TABLE "_share";

-- CreateTable
CREATE TABLE "_retweetBy" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Post_retweetId_unique" ON "Post"("retweetId");

-- CreateIndex
CREATE UNIQUE INDEX "_retweetBy_AB_unique" ON "_retweetBy"("A", "B");

-- CreateIndex
CREATE INDEX "_retweetBy_B_index" ON "_retweetBy"("B");

-- AddForeignKey
ALTER TABLE "_retweetBy" ADD FOREIGN KEY ("A") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_retweetBy" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD FOREIGN KEY ("retweetId") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;
