import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import gameRoutes from "./Routes/gameRoutes.js";
import { sql } from "./config/db.js";
import { aj } from "./lib/arcjet.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

//MiddleWares
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

//apply arcjet rate limit
app.use(async (req, res, next) => {
  try {
    const decision = await aj.protect(req, {
      requested: 1, //
    });

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        res.status(429).json({
          error: "Too Many Request!",
        });
      } else if (decision.reason.isBot()) {
        res.status(403).json({
          error: "Bot Access Denied",
        });
      } else {
        res.status(403).json({
          error: "Forbidden",
        });
      }
      return
    }
    if(decision.results.some((result) => result.reason.isBot() && result.reason.isSpoofed())){
      res.status(403).json({
        error: "Spoof bot detected"
      })
    }
    next()
  } catch (error) {
    console.log(`Arcjet Error: ${error}`)
    next(error)
  }
});

//Api Routes setup
app.use("/api/games", gameRoutes);

async function initDB() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS games(
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      price DECIMAL(10,2) NOT NULL,
      image TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
      `;

    console.log(`DATABASE INITIALIZED SUCCESFULLY!!`);
  } catch (error) {
    console.log(`Error initializing Database: ${error}`);
    throw error;
  }
}

initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
