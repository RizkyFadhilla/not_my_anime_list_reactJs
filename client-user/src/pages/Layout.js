import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="container">
      <h1>Not MyAnimeList</h1>
      <Navbar />
      <Outlet />
    </div>
  );
}
