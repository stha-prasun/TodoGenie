import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/auth/login";
import Signup from "./components/auth/Signup";
import Home from "./components/Home";
import AddTodo from "./components/AddTodo";
import Todo from "./components/Todo";
import Search from "./components/Search";
import EditTodo from "./components/EditTodo";

const App = () => {
  const appRouter = createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Signup />,
    },
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/add",
      element: <AddTodo />,
    },
    {
      path: "/todo/:id",
      element: <Todo />,
    },
    {
      path: "/search",
      element: <Search />,
    },
    {
      path: "/todo/edit",
      element: <EditTodo />,
    },
  ]);
  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
};

export default App;
