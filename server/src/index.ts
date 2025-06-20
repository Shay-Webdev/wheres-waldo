import express from "express";

import type { Request, Response, NextFunction } from "express";
import("dotenv/config");
import cors from "cors";
import indexRoute from "./routes/index";

const app = express();
const clientURL = process.env.CLIENT_URL;
const port = process.env.PORT || 3000;

console.log(`client url in server: `, clientURL);
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) {
        return callback(null, true);
      }
      if (origin === clientURL) {
        return callback(null, true);
      }
      return callback(new Error("CORS error: unauthorized origin"));
    },
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", indexRoute);
app.all("/{*any}", (req, res) => {
  console.error("URL not found:", req.originalUrl);
  res.status(404).send("Route not found");
});
app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
  res.json({
    status: res.status,
    message: `Somethin went wrong`,
    error: err,
  });
});

app.listen(process.env.PORT || 3000, () => {
  console.log(` Server is running on ${port}`);
});
