import React from "react";
import { Button, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const Menu = ({ openAddModal, openModifyModal }) => {
  return (
    <div className="d-flex justify-content-around">
      <Button variant="outline-primary" onClick={openAddModal}>
        Add
      </Button>
      <Button variant="outline-primary" onClick={openModifyModal}>
        Modify
      </Button>
      <Link as={Link} to="/expenses/statistics" className="btn btn-outline-primary">
        Statistics
      </Link>
      <Link as={Link} to="/expenses/shared" className="btn btn-outline-primary">
        Shared Expenses
      </Link>
      <Link as={Link} to="/expenses/configurations" className="btn btn-outline-primary">
        Configurations
      </Link>
    </div>
  );
};
// <Nav.Link as={Link} to="/login">
//   Try it!
// </Nav.Link>;
export default Menu;
