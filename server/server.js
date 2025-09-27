import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import gameRoutes from "./Routes/gameRoutes.js";
import { aj } from "./lib/arcjet.js";
import authRoutes from "./Routes/auth.js"
import { initGamesTable } from "./models/game.js";
import { initUsersTable } from "./models/user.js";

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
    // bypass Arcjet on localhost or 127.0.0.1
    const host = req.headers.host || "";
    if (host.includes("localhost") || host.includes("127.0.0.1")) {
      return next();
    }

    const decision = await aj.protect(req, { requested: 1 });

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        return res.status(429).json({ error: "Too Many Requests!" });
      }
      if (decision.reason.isBot()) {
        return res.status(403).json({ error: "Bot Access Denied" });
      }
      return res.status(403).json({ error: "Forbidden" });
    }

    if (
      decision.results.some(
        (result) => result.reason.isBot() && result.reason.isSpoofed()
      )
    ) {
      return res.status(403).json({ error: "Spoof bot detected" });
    }

    next();
  } catch (error) {
    console.error("Arcjet Error:", error);
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
app.use("/api/users", authRoutes)


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// DB initialized function
async function initDB() {
  try {
    await initGamesTable();
    await initUsersTable();
    console.log("Database initialized");
  } catch (err) {
    console.error("DB initialization error:", err);
  }
}

initDB();