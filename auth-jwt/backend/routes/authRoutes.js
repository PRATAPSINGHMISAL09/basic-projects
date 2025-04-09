import express from "express";
import { register, login, logout } from "../controllers/authCOntroller.js";
import {protect} from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/register",register);
router.post("/login", login);
router.get("/logout", logout);
//example route with protect
router.get("/dashboard",protect, (req, res) => res.json({ msg: "Dashboard" }));
export default router;
