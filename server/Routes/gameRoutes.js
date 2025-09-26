import express from "express";
import {
  createGames,
  deleteGame,
  getGame,
  getGames,
  topRated,
  updateGames,
} from "../Controllers/gameController.js";

const router = express.Router();

router.get("/top-rated", topRated);
router.get("/", getGames);
router.get("/:id", getGame);
router.post("/", createGames);
router.put("/:id", updateGames);
router.delete("/:id", deleteGame);

export default router;
