-- CreateTable
CREATE TABLE "PyShopToken" (
    "id" TEXT NOT NULL,
    "token" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "PyShopToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PyShopProfile" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "tel" TEXT,
    "address" TEXT,
    "aboutMe" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "PyShopProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PyShopUser" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "PyShopUser_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PyShopToken_userId_key" ON "PyShopToken"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "PyShopProfile_userId_key" ON "PyShopProfile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "PyShopUser_email_key" ON "PyShopUser"("email");

-- AddForeignKey
ALTER TABLE "PyShopToken" ADD CONSTRAINT "PyShopToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "PyShopUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PyShopProfile" ADD CONSTRAINT "PyShopProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "PyShopUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;
