import React from "react";
import ReactDOM from "react-dom/client";
import Managers from "./Managers";
import HomePage from "./HomePage";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import ManagerDetail from "./ManagerDetail";
import Login from "./Login";
import CreateUser from "./CreateUser";

const router = createBrowserRouter([
  {
    path: "/manager/:managerId",
    element: <ManagerDetail />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <CreateUser />,
  },
  {
    path: "/passwordManager",
    element: <Managers />,
  },
  {
    path: "/",
    element: <HomePage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
