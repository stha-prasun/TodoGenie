import React, { useState } from "react";
import Navbar from "./shared/Navbar";
import { TODO_API_ENDPOINT } from "../utils/constants";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddTodo = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();

  const user = useSelector((store) => store?.User?.loggedInUser);

  if (!user) {
    navigate("/login");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${TODO_API_ENDPOINT}/new`,
        {
          title,
          description,
          id: user?._id,
        },
        { withCredentials: true }
      );

      if (response.data?.success) {
        toast.success(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 flex items-center justify-center px-4">
        <div className="w-full max-w-xl backdrop-blur-md bg-white/30 border border-white/20 shadow-2xl rounded-3xl p-10">
          <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-8">
            📝 Add a New Todo
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Title
              </label>
              <input
                type="text"
                placeholder="Enter your todo title"
                className="input input-bordered w-full rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Description
              </label>
              <textarea
                placeholder="Enter a short description"
                className="textarea textarea-bordered w-full h-32 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="btn btn-outline btn-primary w-full rounded-xl text-lg tracking-wide shadow-md hover:scale-[1.02] transition-transform"
            >
              ➕ Add Todo
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddTodo;
