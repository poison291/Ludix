import dotenv from "dotenv"
import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";

dotenv.config()

const app = express()
const port = process.env.PORT || 4000


//MiddleWares
app.use(cors())
app.use(morgan("dev"))
app.use(helmet())
app.use(express.json())


app.get("/", (req, res) => {
    res.send("Playport Backend start")
})

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`)
})

