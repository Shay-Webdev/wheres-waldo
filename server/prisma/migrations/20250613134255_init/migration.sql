-- CreateTable
CREATE TABLE "GameData" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "imgURL" TEXT NOT NULL,

    CONSTRAINT "GameData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Character" (
    "id" SERIAL NOT NULL,
    "LogoURL" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "gameDataId" INTEGER NOT NULL,
    "location" JSONB NOT NULL,

    CONSTRAINT "Character_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "GameData_id_key" ON "GameData"("id");

-- CreateIndex
CREATE UNIQUE INDEX "GameData_name_key" ON "GameData"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Character_id_key" ON "Character"("id");

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_gameDataId_fkey" FOREIGN KEY ("gameDataId") REFERENCES "GameData"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
