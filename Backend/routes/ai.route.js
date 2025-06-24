import express from "express";
import { suggestion } from "../controllers/ai.controller.js";

const router = express.Router();

router.route("/suggestion").put(suggestion);

export default router;