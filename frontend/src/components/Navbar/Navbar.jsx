import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import { Container } from "react-bootstrap";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import logoImg from "../../assets/imgs/logo.png";
function MyNavbar() {
  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary ps-1 mb-3 shadow" bg="dark" data-bs-theme="dark">
        <Navbar.Brand href="#home">
          <img alt="" src={logoImg} width="30" height="30" className="d-inline-block align-top" /> MyFinance
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
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
