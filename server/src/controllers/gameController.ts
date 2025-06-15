import type { RequestHandler } from "express";
import * as db from "../models/queries";

const getGameImage: RequestHandler = async (req, res, next) => {
  const gameId = +req.params.id;
  console.log(`gameId in get image controller from params: `, gameId);

  const gameData = await db.getGameDataById(gameId);
  if (!gameData || !gameData.imgURL) {
    res.status(404).json({
      success: false,
      message: `Resource not found`,
    });
  }
  const imgURL = gameData?.imgURL;

  res.sendFile(imgURL as string, (err) => {
    if (err) {
      console.error(`Error sending file in game image: `, err);
      res.json({
        success: false,
        message: "Error fetching resource",
      });
    } else {
      console.log("File sent successfully!");
    }
  });
};

const getCharacterLogoImage: RequestHandler = async (req, res, next) => {
  const characterId = +req.params.characterId;
  console.log(
    `characterId in get character logo controller from params: `,
    characterId,
  );

  const character = await db.getCharacterById(characterId);
  if (!character) {
    res.status(404).json({
      success: false,
      message: `Resource not found`,
    });
  }
  const logoURL = character?.LogoURL;

  res.sendFile(logoURL as string, (err) => {
    if (err) {
      console.error(`Error sending file in character logo image: `, err);
      res.json({
        success: false,
        message: "Error fetching resource",
      });
    } else {
      console.log("File sent successfully!");
    }
  });
};

export { getGameImage, getCharacterLogoImage };
