import { Navbar, Nav, NavDropdown, Dropdown } from "react-bootstrap";
import logoImg from "../../assets/imgs/logo.png";
import { Link } from "react-router-dom";
import moment from "moment";
import "./style.css";
import { useState } from "react";
const { jwtDecode } = require("jwt-decode");
function MyNavbar() {
  const [oraEsatta, setOraEsatta] = useState(null);
  const [expandNavbar, setExpandNavbar] = useState(false);
  const token = localStorage.getItem("authorized_user");
  let decoded = "";
  if (token) decoded = jwtDecode(token);

  const handleLogout = () => {
    localStorage.removeItem("authorized_user");
    window.location.href = "/";
  };

  const today = () => {
    moment.locale("fr");
    let ora = moment().locale("fr").format("MMMM Do YYYY, h:mm:ss a");
    setOraEsatta(ora);
  };
  const closeNavbar = () => {
    setExpandNavbar(false);
  };

  if (token) setInterval(today, 1000);

  return (
    <>
      <Navbar expand="lg" expanded={expandNavbar} onToggle={(expanded) => setExpandNavbar(expanded)} className="bg-light ps-1 mb-3 shadow" data-bs-theme="light">
        <Navbar.Brand as={Link} to="/" onClick={closeNavbar}>
          <img alt="" src={logoImg} width="30" height="30" className="d-inline-block align-top" /> MyFinance
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/home" onClick={closeNavbar}>
              Home
            </Nav.Link>
            {token && (
              <>
                <Nav.Link as={Link} to="/expenses" onClick={closeNavbar}>
                  Expenses
                </Nav.Link>

                <Nav.Link as={Link} to="/statistics" onClick={closeNavbar}>
                  Statistics
                </Nav.Link>

                <Nav.Link as={Link} to="/sharedExpense" onClick={closeNavbar}>
                  Shared Expenses
                </Nav.Link>

                <Nav.Link as={Link} to="/expenses/configurations" onClick={closeNavbar}>
                  Configurations
                </Nav.Link>
              </>
            )}

            {!token ? (
              <Nav.Link as={Link} to="/login" onClick={closeNavbar}>
                Try it!
              </Nav.Link>
            ) : (
              ""
            )}
          </Nav>
          {token ? (
            <Dropdown className="d-flex justify-content-between">
              <label className="d-flex align-items-center">
                <span>{oraEsatta}</span> {decoded.firsName} {decoded.lastName}
              </label>
              <Dropdown.Toggle style={{ backgroundColor: "transparent", border: "none" }} id="dropdown-basic">
                <img className="rounded rounded-circle menu-img" src={decoded.imgProfile}></img>
              </Dropdown.Toggle>

              <Dropdown.Menu style={{ position: "absolute", right: "0", left: "auto" }}>
                <Dropdown.Item as={Link} to="/profile">
                  Your Profile
                </Dropdown.Item>
                {decoded.role === "admin_user" ? (
                  <Dropdown.Item as={Link} to="/config/users">
                    Users Config
                  </Dropdown.Item>
                ) : (
                  ""
                )}
                <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            ""
          )}
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}

export default MyNavbar;
