import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv"
import gameRoutes from "./Routes/gameRoutes.js"

dotenv.config()

const app = express();
const PORT = process.env.PORT

//MiddleWares
app.use(helmet());
app.use(morgan("dev"))
app.use(express.json())
app.use(cors())

app.use("/api/games", gameRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
