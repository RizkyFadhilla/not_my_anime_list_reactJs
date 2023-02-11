import { NavLink } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function NavbarComponent() {
  const navigate = useNavigate();
  const data = useSelector((state) => state.user);

  function logoutHandler(event) {
    event.preventDefault();
    localStorage.clear();
    navigate("/login");
  }
  if (data.role === "superAdmin") {
    return (
      <>
        <Navbar className="text-white bg-primary" expand="lg">
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavLink
                to={"/"}
                className="text-white text-center p-2"
                style={{ textDecoration: "none" }}
              >
                Dashboard
              </NavLink>
              <NavLink
                to={"/genre"}
                className="text-white text-center p-2"
                style={{ textDecoration: "none" }}
              >
                Genres
              </NavLink>
              <NavLink
                to={"/signup"}
                className="text-white text-center p-2"
                style={{ textDecoration: "none" }}
              >
                Register Admin
              </NavLink>
              <Nav.Link
                className="text-white text-center p-2"
                style={{ textDecoration: "none" }}
                onClick={logoutHandler}
              >
                Logout
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </>
    );
  } else {
    return (
      <>
        <Navbar className="text-white bg-primary" expand="lg">
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavLink
                to={"/"}
                className="text-white text-center p-2"
                style={{ textDecoration: "none" }}
              >
                Dashboard
              </NavLink>
              <NavLink
                to={"/genre"}
                className="text-white text-center p-2"
                style={{ textDecoration: "none" }}
              >
                Genres
              </NavLink>
              <Nav.Link
                className="text-white text-center p-2"
                style={{ textDecoration: "none" }}
                onClick={logoutHandler}
              >
                Logout
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </>
    );
  }
}

export default NavbarComponent;
