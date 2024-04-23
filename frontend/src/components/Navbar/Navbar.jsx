import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import logoImg from "../../assets/imgs/logo.png";
import { Link, Router } from "react-router-dom";
const { jwtDecode } = require("jwt-decode");
function MyNavbar() {
  const changePage = () => {
    window.location.href = "/";
  };
  const token = localStorage.getItem("authorized_user");
  let decoded = "";
  if (token) decoded = jwtDecode(token);

  return (
    <>
      <Navbar expand="lg" className="bg-light ps-1 mb-3 shadow" data-bs-theme="light">
        <Navbar.Brand as={Link} to="/">
          <img alt="" src={logoImg} width="30" height="30" className="d-inline-block align-top" /> MyFinance
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/home">
              Home
            </Nav.Link>

            {token ? (
              <Nav.Link as={Link} to="/expenses">
                Expenses
              </Nav.Link>
            ) : (
              ""
            )}

            {!token ? (
              <Nav.Link as={Link} to="/login">
                Try it!
              </Nav.Link>
            ) : (
              ""
            )}
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}

export default MyNavbar;
