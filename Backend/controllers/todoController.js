import { Todo } from "../models/todoSchema.js";
import { User } from "../models/userSchema.js";

export const addTodo = async (req, res) => {
  try {
    const { title, description, id } = req.body;

    if (!title || !description || !id) {
      return res.status(400).json({
        success: false,
        message: "Fields cannot be left empty",
      });
    }

    const newTodo = new Todo({
      title,
      description,
      user: id,
    });

    await newTodo.save();

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.todo.push(newTodo._id);
    await user.save();

    return res.status(201).json({
      success: true,
      message: "Todo added successfully.",
    });
  } catch (error) {
    console.log(error);
  }
};

export const markAsDone = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Id is required",
      });
    }

    const todo = await Todo.findById(id);

    if (!todo) {
      return res.status(400).json({
        success: false,
        message: "Todo not found",
      });
    }

    if (todo.isCompleted) {
      return res.status(200).json({
        success: true,
        message: "Todo is already marked as done",
      });
    }

    todo.isCompleted = true;

    await todo.save();

    return res.status(200).json({
      success: true,
      message: "Marked as done",
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteTodo = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Id is required",
      });
    }

    const todo = await Todo.findByIdAndDelete(id);

    if (!todo) {
      return res.status(400).json({
        success: false,
        message: "Todo does not exits",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Todo Deleted",
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateTodo = async (req, res) => {
  try {
    const { id, title, description, priority } = req.body;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Todo ID is required",
      });
    }

    const todo = await Todo.findById(id);

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: "Todo not found",
      });
    }

    if (title !== undefined) todo.title = title;
    if (description !== undefined) todo.description = description;
    if (priority !== undefined) todo.priority = priority;

    await todo.save();

    return res.status(200).json({
      success: true,
      message: "Todo updated successfully",
    });
  } catch (error) {
    console.error(error);
  }
};

export const getTodoById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Id required",
      });
    }

    const todo = await Todo.findById(id);

    if (!todo) {
      return res.status(400).json({
        success: false,
        message: "Todo not found",
      });
    }

    return res.status(200).json({
      success: true,
      todo,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAllTodos = async (req, res) => {
  try {
    const { id } = req.body; //user id

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    const todos = await Todo.find({ user: id });

    if (todos.length === 0) {
      return res.status(200).json({
        success: false,
        message: "No todos found",
        todos: [],
      });
    }

    return res.status(200).json({
      success: true,
      todos,
    });
  } catch (error) {
    console.log(error);
  }
};

export const search = async (req, res) => {
  try {
    const { id } = req.body; //id => user id
    const { keyword } = req.params;

    if (!id || !keyword) {
      return res.status(400).json({
        success: false,
        message: "User ID and keyword are required",
      });
    }

    const todos = await Todo.find({
      user: id,
      $or: [
        { title: { $regex: keyword, $options: "i" } }, // i => case sensitive
        { description: { $regex: keyword, $options: "i" } },
      ],
    });

    if(todos.length === 0){
      return res.status(200).json({
        success: false,
        message: "No todos found",
        todos: [],
      });
    }

    return res.status(200).json({
      success: true,
      todos,
    });
  } catch (error) {
    console.log(error);
  }
};
