import React from "react";
import { Button, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const Menu = ({ openAddModal, openModifyModal }) => {
  return (
    <div className="d-flex justify-content-around">
      <Button variant="outline-primary" onClick={openAddModal}>
        Add
      </Button>
    </div>
  );
};

export default Menu;
