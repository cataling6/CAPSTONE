import React from "react";
import { Button } from "react-bootstrap";

const Menu = ({ openAddModal, openModifyModal }) => {
  return (
    <div className="d-flex justify-content-around">
      <Button variant="success" onClick={openAddModal}>
        Add
      </Button>
      <Button variant="primary" onClick={openModifyModal}>
        Modify
      </Button>
      <Button variant="danger">Delete</Button>
    </div>
  );
};

export default Menu;
