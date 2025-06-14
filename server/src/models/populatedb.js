const { PrismaClient } = require("../generated/prisma");
const { filesPath } = require("../utils/file.ts");

const prisma = new PrismaClient();
const waldoGameData = filesPath.WheresWaldo;
const { waldo, beggar, randomGuy } = waldoGameData.characters;

async function main() {
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
