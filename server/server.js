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
      return;
    }
    if (
      decision.results.some(
        (result) => result.reason.isBot() && result.reason.isSpoofed()
      )
    ) {
      res.status(403).json({
        error: "Spoof bot detected",
      });
    }
    next();
  } catch (error) {
    console.log(`Arcjet Error: ${error}`);
    next(error);
  }
});
app.get("/", (req, res) => {
  res.send(`
    <html>
      <head>
        <title>PlayPort API</title>
      </head>
      <body style="
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        font-family: sans-serif;
        background-color: #1e1e1e; /* dark gray instead of pure black */
        color: #e0e0e0; /* light text for contrast */
        margin: 0;
      ">
        <div style="text-align: center;">
          <h1 style="color: #9f7aea;">🎮 PlayPort API</h1>
          <p style="font-size: 18px;">Server is running ✅</p>
          <p>
            Use <code style="color: #cbd5e1;">/api/games</code> to access games endpoints
          </p>
        </div>
      </body>
    </html>
  `);
});


//Api Routes setup
app.use("/api/games", gameRoutes);

async function initDB() {
  try {
    // await sql`DROP TABLE games`
    await sql`
      CREATE TABLE IF NOT EXISTS games(
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      price DECIMAL(10,2) NOT NULL CHECK (price >= 0),
      image TEXT NOT NULL,
      categories TEXT[] NOT NULL,
      description TEXT NOT NULL,
      stock INT DEFAULT 0 CHECK (stock >= 0),
      visible BOOLEAN DEFAULT true,
      platforms TEXT[] NOT NULL,
      tags TEXT[] NOT NULL,
      release_date VARCHAR(100) NOT NULL,
      developer VARCHAR(255) NOT NULL,
      publisher VARCHAR(255) NOT NULL,
      rating DECIMAL(2,1) CHECK (rating >= 0 AND rating <= 5) NOT NULL,
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
