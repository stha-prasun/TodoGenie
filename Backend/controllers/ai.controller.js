import { Todo } from "../models/todoSchema.js";

export const suggestion = async (req, res) => {
  try {
    const { id, suggestion } = req.body; // id => todo id
    if (!id || !suggestion) {
      return res.status(400).json({
        success: false,
        message: "Fields cannot be empty",
      });
    }

    const todo = await Todo.findById(id);

    if (!todo) {
      return res.status(400).json({
        success: false,
        message: "No todo found",
      });
    }

    todo.aiSuggestion = suggestion;
    await todo.save();

    return res.status(200).json({
      success: true,
      message: "Ai Suggestion Saved",
    });
  } catch (error) {
    console.log(error);
  }
};
