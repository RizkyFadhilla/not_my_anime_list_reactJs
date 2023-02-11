import { NavLink } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import FetchData from "../hooks/useFetchFiles";

function NavbarComponent() {
  return (
    <Navbar
      className="text-white"
      expand="lg"
      style={{ backgroundColor: "#2e51a2" }}
    >
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <NavLink
            to={"/"}
            className="text-white text-center p-2 fw-bold"
            style={{ textDecoration: "none" }}
          >
            Home
          </NavLink>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavbarComponent;
