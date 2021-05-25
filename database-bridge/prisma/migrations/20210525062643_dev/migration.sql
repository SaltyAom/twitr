-- CreateTable
CREATE TABLE "_favorite" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_share" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_favorite_AB_unique" ON "_favorite"("A", "B");

-- CreateIndex
CREATE INDEX "_favorite_B_index" ON "_favorite"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_share_AB_unique" ON "_share"("A", "B");

-- CreateIndex
CREATE INDEX "_share_B_index" ON "_share"("B");

-- AddForeignKey
ALTER TABLE "_share" ADD FOREIGN KEY ("A") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_share" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_favorite" ADD FOREIGN KEY ("A") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_favorite" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
