import { type RequestHandler } from "express";

const rootController: RequestHandler = (req, res, next) => {
  res.send("Welcome to find it. Send request to valid url to access data...");
};

export { rootController };
