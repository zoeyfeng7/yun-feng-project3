import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Managers from "./Managers";

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
    path: "/",
    element: <Managers />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import App from './App'
// import Pokemons from './Pokemons'

// import {
//   createBrowserRouter,
//   RouterProvider,
//   Route,
// } from "react-router-dom";
// import PokemonDetail from './PokemonDetail';
// import Login from './Login';
// import CreateUser from './CreateUser';

// const router = createBrowserRouter([
//   {
//     path: '/pokemon/:pokemonId',
//     element: <PokemonDetail />
//   },
//   {
//     path: '/login',
//     element: <Login />
//   },
//   {
//     path: '/register',
//     element: <CreateUser />
//   },
//   {
//     path: '/',
//     element: <Pokemons />
//   },

// ])

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <RouterProvider router={router } />
//   </React.StrictMode>,
// )
