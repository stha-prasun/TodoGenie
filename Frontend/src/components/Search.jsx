import React, { useState } from "react";
import Navbar from "./shared/Navbar";

const Search = () => {
  const [query, setQuery] = useState("");

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
            onChange={(e) => setQuery(e.target.value)}
            className="input input-bordered w-full text-base"
          />

          {/* Search Result List */}
          <div className="space-y-4">
            {/* Replace with actual mapped todos */}
            <div className="p-4 rounded-xl shadow bg-white border">
              <h2 className="text-xl font-semibold text-gray-800">Todo Title</h2>
              <p className="text-gray-600">Todo description goes here.</p>
              <div className="mt-2 text-sm text-gray-500 flex gap-4">
                <span className="capitalize">Priority: Medium</span>
                <span>Status: ✅ Completed</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Search;
