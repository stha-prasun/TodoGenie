import mongoose from "mongoose";

const todoModel = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
  dueDate: {
    type: Date,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  priority: {
    type: String,
    enum: ["low", "medium", "high"],
    default: "medium",
  },
  aiSuggestion: {
    type: String,
    default: "",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

export const Todo = mongoose.model("Todo", todoModel);
