import express from "express";
import { allUser, getAllUSer, loginUser, registerUser } from "../controller/userController.js";
const router = express.Router();

router.get("/getAll/:query", getAllUSer)
router.get("/all", allUser);
router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;