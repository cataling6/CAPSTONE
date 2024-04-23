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
    </div>
  );
};
// <Nav.Link as={Link} to="/login">
//   Try it!
// </Nav.Link>;
export default Menu;
