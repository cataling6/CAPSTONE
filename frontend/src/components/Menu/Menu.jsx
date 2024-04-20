import React from "react";
import { Button } from "react-bootstrap";

const Menu = () => {
  return (
    <div className="d-flex justify-content-around">
      <Button variant="success">Add</Button>
      <Button variant="primary">Modify</Button>
      <Button variant="danger">Delete</Button>
    </div>
  );
};

export default Menu;
