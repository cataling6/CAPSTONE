import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import AddExpense from "../AddExpense/AddExpense";
import EditExpense from "../EditExpense/EditExpense";
import "./style.css";
function MyModal({ show, setShow, modalOp }) {
  return (
    <>
      <Modal show={show} onHide={() => setShow(false)} className="main">
        <Modal.Header closeButton>
          <Modal.Title>Add new expense</Modal.Title>
        </Modal.Header>
        {modalOp === "add" ? (
          <Modal.Body>
            <AddExpense setShow={setShow} />
          </Modal.Body>
        ) : (
          <Modal.Body>
            <EditExpense />
          </Modal.Body>
        )}
      </Modal>
    </>
  );
}

export default MyModal;
