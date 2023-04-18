-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT E'',
    "firstName" TEXT NOT NULL DEFAULT E'',
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,
    "email" TEXT NOT NULL DEFAULT E'',
    "password" TEXT,
    "photo_filesize" INTEGER,
    "photo_extension" TEXT,
    "photo_width" INTEGER,
    "photo_height" INTEGER,
    "photo_id" TEXT,
    "passwordResetToken" TEXT,
    "passwordResetIssuedAt" TIMESTAMP(3),
    "passwordResetRedeemedAt" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "List" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT E'',
    "category" TEXT,
    "updated_at" TIMESTAMP(3),
    "date" DATE,
    "description" TEXT NOT NULL DEFAULT E'',
    "private" BOOLEAN NOT NULL DEFAULT false,
    "user" TEXT,

    CONSTRAINT "List_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ListCategory" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT E'',

    CONSTRAINT "ListCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Gift" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT E'',
    "link" TEXT NOT NULL DEFAULT E'',
    "price" DOUBLE PRECISION NOT NULL,
    "description" TEXT NOT NULL DEFAULT E'',
    "degree" INTEGER NOT NULL,
    "image_filesize" INTEGER,
    "image_extension" TEXT,
    "image_width" INTEGER,
    "image_height" INTEGER,
    "image_id" TEXT,
    "color" TEXT NOT NULL DEFAULT E'',
    "size" TEXT NOT NULL DEFAULT E'',
    "reserved" BOOLEAN NOT NULL DEFAULT false,
    "archived" BOOLEAN NOT NULL DEFAULT false,
    "updated_at" TIMESTAMP(3),
    "reservedAt" DATE,
    "reservedBy" TEXT,
    "anonymousReservedBy" TEXT NOT NULL DEFAULT E'',
    "list" TEXT,
    "user" TEXT,

    CONSTRAINT "Gift_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_List_userFavorites" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "List_category_idx" ON "List"("category");

-- CreateIndex
CREATE INDEX "List_user_idx" ON "List"("user");

-- CreateIndex
CREATE INDEX "Gift_reservedBy_idx" ON "Gift"("reservedBy");

-- CreateIndex
CREATE INDEX "Gift_list_idx" ON "Gift"("list");

-- CreateIndex
CREATE INDEX "Gift_user_idx" ON "Gift"("user");

-- CreateIndex
CREATE UNIQUE INDEX "_List_userFavorites_AB_unique" ON "_List_userFavorites"("A", "B");

-- CreateIndex
CREATE INDEX "_List_userFavorites_B_index" ON "_List_userFavorites"("B");

-- AddForeignKey
ALTER TABLE "List" ADD CONSTRAINT "List_user_fkey" FOREIGN KEY ("user") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "List" ADD CONSTRAINT "List_category_fkey" FOREIGN KEY ("category") REFERENCES "ListCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Gift" ADD CONSTRAINT "Gift_reservedBy_fkey" FOREIGN KEY ("reservedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Gift" ADD CONSTRAINT "Gift_user_fkey" FOREIGN KEY ("user") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Gift" ADD CONSTRAINT "Gift_list_fkey" FOREIGN KEY ("list") REFERENCES "List"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_List_userFavorites" ADD CONSTRAINT "_List_userFavorites_A_fkey" FOREIGN KEY ("A") REFERENCES "List"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_List_userFavorites" ADD CONSTRAINT "_List_userFavorites_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
