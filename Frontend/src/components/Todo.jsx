import React from "react";
import Navbar from "./shared/Navbar";
import { useParams } from "react-router-dom";
import useGetTodo from "../hooks/useGetTodo";
import { useSelector } from "react-redux";

const Todo = () => {
  const { id } = useParams();

  useGetTodo(id);

  const todo = useSelector((store) => store.Todo.todo);

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
                  defaultChecked={todo?.isCompleted}
                />
              </label>
            </div>
          </div>

          {/* AI Suggestion */}
          <div>
            <div className="flex gap-2">
              <button className="btn btn-accent mt-4">
                🤖 Get AI Suggestion
              </button>
              <button className="btn btn-outline mt-4">Edit</button>
            </div>
            {todo?.aiSuggestion && (
              <div className="mt-4 p-4 bg-gray-100 rounded-xl border">
                <h3 className="font-semibold mb-2 text-gray-800">
                  AI Suggestion:
                </h3>
                <p className="text-gray-700">{todo?.aiSuggestion}</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default Todo;
