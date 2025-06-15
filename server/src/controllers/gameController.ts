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
      console.error(`Error sending file in game: `, err);
      res.send(`Error sending file: ${err}`);
    } else {
      console.log("File sent successfully!");
    }
  });
};

export { getGameImage };
