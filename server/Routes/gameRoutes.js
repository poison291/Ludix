import express from "express";
import { createGames, getAllGames } from "../Controllers/gameController";

const router = express.Router();

router.get("/", getAllGames);
router.post("/", createGames);

export default router;
