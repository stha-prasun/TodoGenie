import React from "react";
import Navbar from "./shared/Navbar";
import useGetAllTodos from "../hooks/useGetAllTodos";
import { useSelector } from "react-redux";

const Home = () => {
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
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col overflow-hidden"
              style={{ minHeight: "360px" }}
            >
              <figure className="overflow-hidden rounded-t-xl">
                <img
                  src="/image.jpg"
                  alt={item?.title}
                  className="w-full h-full object-fill"
                />
              </figure>

              <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900">
                    {item?.title}
                  </h2>
                  <p className="mt-3 text-gray-700 leading-relaxed">
                    {item?.description}
                  </p>
                </div>

                <footer className="mt-6 flex items-center justify-between text-sm text-gray-500">
                  <time dateTime={item?.createdAt}>
                    Created: {new Date(item?.createdAt).toLocaleDateString()}
                  </time>
                  <button
                    type="button"
                    className="btn btn-outline btn-primary px-5 py-2 rounded-md hover:bg-primary hover:text-white transition-colors duration-300"
                  >
                    View Todo
                  </button>
                </footer>
              </div>
            </article>
          ))}
        </section>
      </main>
    </>
  );
};

export default Home;
