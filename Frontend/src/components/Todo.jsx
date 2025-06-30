import React from "react";
import Navbar from "./shared/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import useGetTodo from "../hooks/useGetTodo";
import { useSelector } from "react-redux";
import axios from "axios";
import { AI_API_ENDPOINT, TODO_API_ENDPOINT } from "../utils/constants";
import toast from "react-hot-toast";

const Todo = () => {
  const { id } = useParams();
  const fetchTodo = useGetTodo(id);

  const navigate = useNavigate();

  const todo = useSelector((store) => store.Todo.todo);

  const handleAI = async () => {
    try {
      const response = await axios.post(import.meta.env.VITE_AI_API_ENDPOINT, {
        contents: [
          {
            parts: [
              {
                text: `You are an intelligent productivity assistant. Based on the task description provided, generate 3–5 smart, helpful suggestions that can help the user break down, improve, or approach the task more effectively. The suggestions should be Simple and clear, Actionable, Relevant to the task, Written in plain, helpful language. Task Description: ${todo?.description} Give your suggestions in a numbered list.`,
              },
            ],
          },
        ],
      });

      const suggestion =
        response?.data?.candidates?.[0]?.content?.parts?.[0]?.text;

      const res = await axios.put(
        `${AI_API_ENDPOINT}/suggestion`,
        { id, suggestion },
        { withCredentials: true }
      );

      if (res?.data?.success) {
        toast.success(res?.data.message);
        await fetchTodo();
      }
    } catch (error) {
      console.error("AI Suggestion Error:", error);
      toast.error("Failed to get AI suggestion.");
    }
  };

  const handleDelete = async () => {
    try {
      const res = await axios.delete(`${TODO_API_ENDPOINT}/delete`, {
        data: { id },
        withCredentials: true,
      });

      if (res?.data?.success) {
        toast.success(res.data.message);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const handleToggle = async () => {
    try {
      const res = await axios.post(
        `${TODO_API_ENDPOINT}/mark`,
        { id },
        { withCredentials: true }
      );

      if (res?.data?.success) {
        toast.success(res.data.message);
        await fetchTodo();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-white px-6 py-16 sm:px-12 lg:px-24">
        <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-3xl p-10 border border-gray-100 space-y-8">
          {/* Title */}
          <h1 className="text-4xl font-extrabold text-gray-900">
            {todo?.title}
          </h1>

          {/* Featured Image */}
          <figure className="rounded-xl overflow-hidden shadow-md">
            <img
              src="/bg.jpg"
              alt="Todo visual"
              className="w-full h-64 object-cover"
            />
          </figure>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
            <span className="badge badge-outline badge-primary capitalize">
              Priority: {todo?.priority}
            </span>
            <span>
              Created: {new Date(todo?.createdAt).toLocaleDateString()}
            </span>
            <span>
              Updated: {new Date(todo?.updatedAt).toLocaleDateString()}
            </span>
          </div>

          {/* Description */}
          <div>
            <h2 className="text-xl font-semibold mb-2 text-gray-800">
              Description
            </h2>
            <p className="text-gray-700 text-lg">{todo?.description}</p>
          </div>

          {/* Action Controls */}
          <div className="grid sm:grid-cols-2 gap-6 mt-4">
            {/* Priority Selector */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-medium">Change Priority</span>
              </label>
              <select className="select select-bordered">
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>

            {/* Completion Toggle */}
            <div className="form-control w-full">
              <label className="label cursor-pointer">
                <span className="label-text font-medium">
                  Mark as Completed
                </span>
                <input
                  type="checkbox"
                  className="toggle toggle-success"
                  checked={todo?.isCompleted}
                  onChange={handleToggle}
                />
              </label>
            </div>
          </div>

          {/* AI Suggestion */}
          <div>
            <div className="flex gap-2">
              <button onClick={handleAI} className="btn btn-accent mt-4">
                🤖 Get AI Suggestion
              </button>
              <button onClick={()=>navigate("/todo/edit")} className="btn btn-outline mt-4">Edit</button>
              <button
                onClick={handleDelete}
                className="btn btn-outline btn-error mt-4"
              >
                Delete
              </button>
            </div>
            {todo?.aiSuggestion && (
              <div className="mt-4 p-4 bg-gray-100 rounded-xl border">
                <h3 className="font-semibold mb-2 text-gray-800">
                  AI Suggestion:
                </h3>
                <p className="text-gray-700 whitespace-pre-line">
                  {todo?.aiSuggestion}
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default Todo;
