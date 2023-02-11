import { createBrowserRouter } from "react-router-dom";
import AnimeList from "../pages/AnimeList";
import AnimeDetail from "../pages/AnimeDetail";
import Layout from "../pages/Layout";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <AnimeList />,
      },
      {
        path: "/Anime/:animeId",
        element: <AnimeDetail />,
      },
    ],
  },
]);

export default router;
