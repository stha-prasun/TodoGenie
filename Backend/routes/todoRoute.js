import express from "express";
import { addTodo, deleteTodo, markAsDone } from "../controllers/todoController.js";

const router = express.Router();

router.route("/new").post(addTodo);

router.route("/mark").post(markAsDone);

router.route("/delete").post(deleteTodo);

export default router;