import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import gameRoutes from "./Routes/gameRoutes.js";
import authRoutes from "./Routes/auth.js";
import reportRoutes from "./Routes/reportRoutes.js"
import { aj } from "./lib/arcjet.js";
import { initGamesTable } from "./models/game.js";
import { initUsersTable } from "./models/user.js";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5001;
const URL = process.env.BACKEND_URL

//MiddleWares
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(
  cors({
    origin: ["https://ludix.vercel.app", "http://localhost:5173"],
  })
);

//apply arcjet rate limit
app.use(async (req, res, next) => {
  try {
    const host = req.headers.host || "";
    if (
      host.includes("localhost") ||
      host.includes("127.0.0.1") ||
      host.includes("vercel.app")
    ) {
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
  res.sendFile(path.join(__dirname, "index.html"));
});

//Api Routes setup
app.use("/api/games", gameRoutes);
app.use("/api/users", authRoutes);
app.use("/api/reports", reportRoutes)

app.get("/api", (req, res) => {
  res.json({
    endpoints: [
      { method: "GET", path: "/api/games", description: "Get all games" },
      { method: "GET", path: "/api/users", description: "Get all users" },
    ],
  });
});

app.listen(PORT, () => {
  console.log(
    `Server is running on ${URL}`
  );
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
