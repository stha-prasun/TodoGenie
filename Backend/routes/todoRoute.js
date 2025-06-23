import express from "express";
import { addTodo, markAsDone } from "../controllers/todoController.js";

const router = express.Router();

router.route("/new").post(addTodo);

router.route("/mark").post(markAsDone);

export default router;