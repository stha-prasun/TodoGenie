import React from "react";
import Navbar from "./shared/Navbar";
import useGetAllTodos from "../hooks/useGetAllTodos";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  useGetAllTodos();

  const todos = useSelector((store) => store?.Todos?.todos);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-16 px-6 sm:px-12 lg:px-24">
        <header className="max-w-5xl mx-auto text-center mb-12">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-2">
            Your Todo Dashboard
          </h1>
          <p className="text-gray-600 text-lg">
            Manage your tasks efficiently and effortlessly.
          </p>
          <div className="border-b border-gray-300 mt-8"></div>
        </header>

        <section className="max-w-7xl mx-auto grid gap-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {todos.map((item) => (
            <article
              key={item?._id}
              className="bg-white rounded-2xl shadow-xl hover:shadow-2xl hover:scale-[1.01] transition-all duration-300 border border-gray-100 flex flex-col overflow-hidden"
            >
              <figure className="h-48 w-full overflow-hidden rounded-t-2xl">
                <img
                  src="/image.jpg"
                  alt={item?.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </figure>

              <div className="p-5 flex flex-col justify-between flex-grow space-y-4">
                {/* Badge moved above title for hierarchy */}
                <div className="flex justify-between items-center">
                  <span className="badge badge-primary badge-outline text-sm px-3 py-1">
                    {item?.priority}
                  </span>
                </div>

                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1">
                    {item?.title}
                  </h2>
                  <p className="text-gray-600 leading-relaxed line-clamp-4">
                    {item?.description}
                  </p>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-200 mt-auto">
                  <time dateTime={item?.createdAt}>
                    Created: {new Date(item?.createdAt).toLocaleDateString()}
                  </time>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline btn-primary hover:text-white hover:bg-primary transition"
                    onClick={()=>navigate(`/todo/${item?._id}`)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </article>
          ))}
        </section>
      </main>
    </>
  );
};

export default Home;
