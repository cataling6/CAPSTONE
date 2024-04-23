import React from "react";
import { Button } from "react-bootstrap";

const Menu = ({ openAddModal, openModifyModal }) => {
  return (
    <div className="d-flex justify-content-around">
      <Button variant="outline-primary" onClick={openAddModal}>
        Add
      </Button>
      <Button variant="outline-primary" onClick={openModifyModal}>
        Modify
      </Button>
      <Button variant="outline-primary">Satistics</Button>
      <Button variant="outline-primary">Shared Expenses</Button>
      <Button variant="outline-primary">Configurations</Button>
    </div>
  );
};

export default Menu;
