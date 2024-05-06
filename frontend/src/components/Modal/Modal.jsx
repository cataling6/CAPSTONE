import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import AddExpense from "../AddExpense/AddExpense";
import EditExpense from "../EditExpense/EditExpense";
import "./style.css";
import ShareExpense from "../ShareExpense/ShareExpense";

function MyModal({ show, setShow, modalOp, element, toast }) {
  let title;
  switch (modalOp) {
    case "add":
      title = "Add new expense";
      break;
    case "edit":
      title = "Edit expense";
      break;
    case "share":
      title = "Share the expense";
      break;
    default:
      break;
  }

  return (
    <>
      <Modal show={show} onHide={() => setShow(false)} className="main">
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        {modalOp === "add" ? (
          <Modal.Body>
            <AddExpense setShow={setShow} toast={toast} />
          </Modal.Body>
        ) : modalOp === "edit" ? (
          <Modal.Body>
            <EditExpense expense={element} />
          </Modal.Body>
        ) : (
          <Modal.Body>
            <ShareExpense expense={element} setShow={setShow} toast={toast} />
          </Modal.Body>
        )}
      </Modal>
    </>
  );
}

export default MyModal;
