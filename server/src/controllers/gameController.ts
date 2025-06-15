import type { RequestHandler } from "express";
import * as db from "../models/queries";

const getGameDetail: RequestHandler = async (req, res, next) => {
  try {
    const gameID = +req.params.id;
    console.log(`gameID in get game details controller from params: `, gameID);

    const gameData = await db.getGameDataById(gameID);
    if (!gameData) {
      res.status(404).json({
        success: false,
        message: `Resource not found`,
      });
    }
    res.json({
      success: true,
      data: gameData,
    });
  } catch (error) {
    console.error(`Error fetching data: `, error);
    res.json({
      success: false,
      message: "Error fetching data",
    });
  }
};

const getCharacterDetail: RequestHandler = async (req, res, next) => {
  try {
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
    res.json({
      success: true,
      data: character,
    });
  } catch (error) {
    console.error(`Error fetching data: `, error);
    res.json({
      success: false,
      message: "Error fetching data",
    });
  }
};

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

export {
  getGameImage,
  getCharacterLogoImage,
  getGameDetail,
  getCharacterDetail,
};
