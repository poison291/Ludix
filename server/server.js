import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import gameRoutes from "./Routes/gameRoutes.js";
import { sql } from "./config/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

//MiddleWares
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

app.use("/api/games", gameRoutes);

async function initDB() {
  try {
    
  

    await sql`
      CREATE TABLE IF NOT EXISTs games(
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
