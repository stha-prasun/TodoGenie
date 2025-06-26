import express from "express";
import { addTodo, deleteTodo, getAllTodos, getTodoById, markAsDone, search, updateTodo } from "../controllers/todoController.js";

const router = express.Router();

router.route("/new").post(addTodo);

router.route("/mark").post(markAsDone);

router.route("/delete").delete(deleteTodo);

router.route("/update").post(updateTodo);

router.route("/get/all").post(getAllTodos);

router.route("/get/:id").get(getTodoById);

router.route("/search/:keyword").get(search);

export default router;