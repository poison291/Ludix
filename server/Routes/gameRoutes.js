import express from "express";
import {
  createGames,
  deleteGame,
  getGame,
  getGames,
  updateGames,
} from "../Controllers/gameController.js";

const router = express.Router();

router.get("/", getGames);
router.get("/:id", getGame);
router.post("/", createGames);
router.put("/:id", updateGames);
router.delete("/:id", deleteGame);

export default router;
