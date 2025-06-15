import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

const getGameDataById = async (id: number) => {
  try {
    const gameData = prisma.gameData.findUnique({
      where: {
        id,
      },
      include: {
        Character: true,
      },
    });
    return gameData;
  } catch (error) {
    console.log(`Error fetching game data: `, error);
    throw new Error(error);
  }
};

const getCharacterById = async (id: number) => {
  try {
    const character = prisma.character.findUnique({
      where: { id },
      include: { CharacterCoordinates: true },
    });
    return character;
  } catch (error) {
    console.log(`Error fetching character data: `, error);
    throw new Error(error);
  }
};

const getAllCharacters = async (gameDataId: number) => {
  try {
    const characters = prisma.character.findMany({
      where: { gameDataId },
      include: { CharacterCoordinates: true },
    });
    return characters;
  } catch (error) {
    console.log(`Error fetching characters data: `, error);
    throw new Error(error);
  }
};

const getallGameData = async () => {
  try {
    const gameData = prisma.gameData.findMany();
    return gameData;
  } catch (error) {
    console.log(`Error fetching games data: `, error);
    throw new Error(error);
  }
};

export { getAllCharacters, getGameDataById, getCharacterById, getallGameData };
