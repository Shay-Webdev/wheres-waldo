const { PrismaClient } = require("../generated/prisma");
const { filesPath } = require("../utils/file.ts");

const prisma = new PrismaClient();
const waldoGameData = filesPath.WheresWaldo;
const { waldo, beggar, randomGuy } = waldoGameData.characters;

async function main() {
  try {
    await prisma.$transaction(async (tx) => {
      // 1. Delete all records from CharacterCoordinates (child of Character)
      const deleteCoords = await tx.characterCoordinates.deleteMany({});
      console.log(
        `Deleted ${deleteCoords.count} CharacterCoordinates records.`,
      );

      // 2. Delete all records from Character (child of GameData)
      const deleteChars = await tx.character.deleteMany({});
      console.log(`Deleted ${deleteChars.count} Character records.`);

      // 3. Delete all records from GameData (parent table)
      const deleteGames = await tx.gameData.deleteMany({});
      console.log(`Deleted ${deleteGames.count} GameData records.`);

      console.log("\nAll data successfully deleted from all tables!");
    });
  } catch (error) {
    console.error("Error deleting all data:", error);
    // You might want to throw the error to propagate it
    throw error;
  }
  await prisma.gameData.create({
    data: {
      name: `Where's Waldo`,
      imgURL: waldoGameData.imgURL,
      Character: {
        create: [
          {
            name: waldo.name,
            LogoURL: waldo.logoURL,
            CharacterCoordinates: {
              create: {
                coordinates: waldo.coordinates,
              },
            },
          },
          {
            name: beggar.name,
            LogoURL: beggar.logoURL,
            CharacterCoordinates: {
              create: {
                coordinates: beggar.coordinates,
              },
            },
          },
          {
            name: randomGuy.name,
            LogoURL: randomGuy.logoURL,
            CharacterCoordinates: {
              create: {
                coordinates: randomGuy.coordinates,
              },
            },
          },
        ],
      },
    },
  });

  const allGames = await prisma.gameData.findMany();
  console.log(`all game data from prisma DB: `, allGames);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit();
  });
