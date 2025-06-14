import { Router } from "express";
import path from "path";

const router = Router();
const filePath = path.join(__dirname, "../..", "public", "waldo-logo-3.jpg");

router.route("/").get((req, res, next) => {
  res.sendFile(filePath, (err) => {
    if (err) {
      console.error(`Error sending file in game: `, err);
      res.send(`Error sending file: ${err}`);
    } else {
      console.log("File sent successfully!");
    }
  });
});

export default router;
