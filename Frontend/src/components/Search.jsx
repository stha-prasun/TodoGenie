import React, { useState } from "react";
import axios from "axios";
import Navbar from "./shared/Navbar";
import { TODO_API_ENDPOINT } from "../utils/constants";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const navigate = useNavigate();

  const user = useSelector((store) => store.User.loggedInUser);

  const searchTodos = async (text) => {
    try {
      const res = await axios.post(
        `${TODO_API_ENDPOINT}/search/${text}`,
        {
          id: user._id,
        },
        { withCredentials: true }
      );

      setResults(res.data.todos || []);
    } catch (error) {
      console.error("Search failed:", error);
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim() === "") {
      setResults([]);
      return;
    }

    searchTodos(value);
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 px-4 py-12 sm:px-8 lg:px-16">
        <div className="max-w-3xl mx-auto space-y-6">
          <h1 className="text-3xl font-bold text-gray-800 text-center">
            🔍 Search Todos
          </h1>

          {/* Search Input */}
          <input
            type="text"
            placeholder="Search todos..."
            value={query}
            onChange={handleChange}
            className="input input-bordered w-full text-base"
          />

          {/* Search Results */}
          <div className="space-y-4">
            {query && results.length === 0 ? (
              <p className="text-center text-gray-400">No todos found.</p>
            ) : (
              results.map((todo) => (
                <div
                  key={todo._id}
                  className="p-4 rounded-xl shadow bg-white border cursor-pointer"
                  onClick={()=>navigate(`/todo/${todo?._id}`)}
                >
                  <h2 className="text-xl font-semibold text-gray-800">
                    {todo.title}
                  </h2>
                  <p className="text-gray-600">{todo.description}</p>
                  <div className="mt-2 text-sm text-gray-500 flex gap-4">
                    <span className="capitalize">
                      Priority: {todo.priority}
                    </span>
                    <span>
                      Status:{" "}
                      {todo.isCompleted ? "✅ Completed" : "❌ Incomplete"}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default Search;
