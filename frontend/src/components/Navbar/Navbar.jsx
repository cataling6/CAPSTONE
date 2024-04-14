import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import logoImg from "../../assets/imgs/logo.png";
import { Link, Router } from "react-router-dom";

function MyNavbar() {
  const changePage = () => {
    window.location.href = "/";
  };
  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary ps-1 mb-3 shadow" bg="dark" data-bs-theme="dark">
        <Navbar.Brand as={Link} to="/">
          <img alt="" src={logoImg} width="30" height="30" className="d-inline-block align-top" /> MyFinance
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/home">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/dollaro">
              Link
            </Nav.Link>
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
