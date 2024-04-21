import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import AddExpense from "../AddExpenseModal/AddExpense";
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
            <AddExpense />
          </Modal.Body>
        ) : (
          <Modal.Body>
            <EditExpense />
          </Modal.Body>
        )}
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={() => setShow(false)}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default MyModal;
