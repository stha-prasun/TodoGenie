import express from "express";
import { addTodo } from "../controllers/todoController.js";

const router = express.Router();

router.route("/new").post(addTodo);

export default router;