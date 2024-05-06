import { Navbar, Nav, NavDropdown, Dropdown } from "react-bootstrap";
import logoImg from "../../assets/imgs/logo.png";
import { Link } from "react-router-dom";
import moment from "moment";
import "./style.css";
import { useState } from "react";
const { jwtDecode } = require("jwt-decode");
function MyNavbar() {
  const [oraEsatta, setOraEsatta] = useState(null);
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

  if (token) setInterval(today, 1000);

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
            {token && (
              <>
                <Nav.Link as={Link} to="/expenses">
                  Expenses
                </Nav.Link>

                <Nav.Link as={Link} to="/statistics">
                  Statistics
                </Nav.Link>

                <Nav.Link as={Link} to="/sharedExpense">
                  Shared Expenses
                </Nav.Link>

                <Nav.Link as={Link} to="/expenses/configurations">
                  Configurations
                </Nav.Link>
              </>
            )}

            {!token ? (
              <Nav.Link as={Link} to="/login">
                Try it!
              </Nav.Link>
            ) : (
              ""
            )}
          </Nav>
          {token ? (
            <Dropdown>
              <label>
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
