import express from "express"
import {AddUser, getUser, getUsers} from "../Controllers/userController.js"

const router = express.Router()

router.get("/", getUsers)
router.get("/:id", getUser)
router.post("/", AddUser)


export default router;