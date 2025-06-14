import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const BASE_DIR = path.join(__dirname, "../..");

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
  [1508, 1396],
  [1462, 1252],
];

const filesPath = {
  WheresWaldo: {
    imgURL: path.join(BASE_DIR, "waldo-logo.png"),
    characters: {
      waldo: {
        name: "waldo",
        logoURL: path.join(BASE_DIR, "waldo-logo-3.jpg"),
        coordinates: waldoPolygon,
      },
      beggar: {
        name: "beggar",
        logoURL: path.join(BASE_DIR, "begger-logo-2.jpg"),
        coordinates: beggerPolygon,
      },
      randomGuy: {
        name: "randomGuy",
        logoURL: path.join(BASE_DIR, "randomguy-logo.jpg"),
        coordinates: randomGuyPolygon,
      },
    },
  },
};

export { filesPath };
