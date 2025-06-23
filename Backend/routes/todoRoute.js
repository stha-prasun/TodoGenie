import express from "express";
import { addTodo, deleteTodo, markAsDone, updateTodo } from "../controllers/todoController.js";

const router = express.Router();

router.route("/new").post(addTodo);

router.route("/mark").post(markAsDone);

router.route("/delete").post(deleteTodo);

router.route("/update").post(updateTodo);

export default router;