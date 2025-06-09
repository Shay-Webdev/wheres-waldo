const games = [
  {
    imgURL: "/src/assets/wheres-waldo.jpg",
    imgName: "Where's Waldo",
    gameId: 1,
    characters: [
      {
        id: 1,
        name: "waldo",
        logoURL: "/src/assets/waldo-logo-3.jpg",
      },
      {
        id: 2,
        name: "beggar",
        logoURL: "/src/assets/begger-logo-2.jpg",
      },
      {
        id: 3,
        name: "random-guy",
        logoURL: "/src/assets/randomguy-logo.jpg",
      },
    ],
  },
  {
    imgURL: "",
    imgName: "game2",
    gameId: 2,
    characters: [],
  },
  {
    imgURL: "",
    imgName: "game3",
    gameId: 3,
    characters: [],
  },
];

type Games = typeof games;

const waldoPolygon = [
  [1327, 707],
  [1365, 770],
  [1428, 835],
  [1373, 864],
  [1341, 897],
  [1295, 873],
  [1251, 849],
  [1278, 787],
];
const beggerPolygon = [
  [424, 402],
  [512, 451],
  [499, 564],
  [467, 620],
  [395, 559],
  [354, 472],
];
const randomGuyPolygon = [
  [1508, 1137],
  [1576, 1271],
  [1508.1396],
  [1462, 1252],
];
export { type Games, games, randomGuyPolygon, beggerPolygon, waldoPolygon };
