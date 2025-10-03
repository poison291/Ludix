import express from "express"
import { getReports } from "../Controllers/reportController.js";
import { submitReport } from "../Controllers/reportController.js";


const router = express.Router()

router.get("/", getReports)
router.post("/", submitReport)



export default router;