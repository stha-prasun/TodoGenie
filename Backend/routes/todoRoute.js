import express from "express";
import { addTodo, deleteTodo, getAllTodos, getTodoById, markAsDone, search, updateTodo } from "../controllers/todoController.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.route("/new").post(isAuthenticated, addTodo);

router.route("/mark").post(isAuthenticated, markAsDone);

router.route("/delete").delete(isAuthenticated, deleteTodo);

router.route("/update").post(isAuthenticated, updateTodo);

router.route("/get/all").post(isAuthenticated, getAllTodos);

router.route("/get/:id").get(isAuthenticated, getTodoById);

router.route("/search/:keyword").post(isAuthenticated, search);

export default router;