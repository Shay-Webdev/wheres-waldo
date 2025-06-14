-- CreateTable
CREATE TABLE "CharacterCoordinates" (
    "id" SERIAL NOT NULL,
    "xCoord" INTEGER NOT NULL,
    "yCoord" INTEGER NOT NULL,
    "characterId" INTEGER NOT NULL,

    CONSTRAINT "CharacterCoordinates_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CharacterCoordinates_id_key" ON "CharacterCoordinates"("id");

-- CreateIndex
CREATE UNIQUE INDEX "CharacterCoordinates_characterId_key" ON "CharacterCoordinates"("characterId");

-- AddForeignKey
ALTER TABLE "CharacterCoordinates" ADD CONSTRAINT "CharacterCoordinates_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
