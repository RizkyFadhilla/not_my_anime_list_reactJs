import { createBrowserRouter, redirect } from "react-router-dom";
import AnimeList from "../pages/AnimeList";
import GenreList from "../pages/GenreList";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import Layout from "../pages/Layout";

const router = createBrowserRouter([
  {
    element: <Layout />,
    loader: () => {
      const token = localStorage.getItem("access_token");
      if (!token) {
        throw redirect("/login");
      }
    },
    children: [
      {
        path: "/",
        element: <AnimeList />,
      },
      {
        path: "/genre",
        element: <GenreList />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
    loader: () => {
      const token = localStorage.access_token;
      if (token) {
        throw redirect("/");
      }
    },
  },
]);

export default router;
