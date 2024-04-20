import React from "react";
import { Container } from "react-bootstrap";
import { useState } from "react";
import Menu from "../Menu/Menu";
import MyModal from "../Modal/Modal";

const Expenses = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalOp, setModalOp] = useState("");
  const openModal = () => setShowModal(true);

  const openAddModal = () => {
    setShowModal(true);
    setModalOp("add");
  };

  const openModifyModal = () => {
    console.log(modalOp);
    setShowModal(true);
    setModalOp("edit");
  };

  return (
    <>
      <Container>
        <Menu openAddModal={openAddModal} openModifyModal={openModifyModal} />
        <h1>Le tue spese</h1>
        <MyModal show={showModal} setShow={setShowModal} modalOp={modalOp} />
      </Container>
    </>
  );
};

export default Expenses;
