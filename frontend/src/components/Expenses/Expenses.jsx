import React, { useContext, useEffect } from "react";
import { Button, Container } from "react-bootstrap";
import { useState } from "react";
import Menu from "../Menu/Menu";
import MyModal from "../Modal/Modal";
import { ExpensesCtx } from "../../contexts/expenses_ctx";
import { CategoryCtx } from "../../contexts/category_ctx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faShareNodes, faAnglesLeft, faAnglesRight } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";

import Swal from "sweetalert2";
import { getContrast } from "polished";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./style.css";

const Expenses = () => {
  const { allUserExpenses, getUserExpenses, deleteExpenseById } = useContext(ExpensesCtx);
  const { categories, getCategories } = useContext(CategoryCtx);
  const [showModal, setShowModal] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [error, setError] = useState(false);
  const [elementForModal, setElementForModal] = useState();
  const [modalOp, setModalOp] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // const openModal = () => setShowModal(true);

  const openAddModal = () => {
    setShowModal(true);
    setModalOp("add");
  };

  const openModifyModal = () => {
    setShowModal(true);
    setModalOp("edit");
  };

  const openShareModal = (expense) => {
    setElementForModal(expense);
    setShowModal(true);
    setModalOp("share");
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const getCategoryById = (categoryId) => {
    return categories.find((category) => category._id === categoryId);
  };

  const verifyDelete = (id) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger me-2",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: `<b>I'm deleting an expense</b>`,
        text: "Do you really want to delete it?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Si!",
        cancelButtonText: "No!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          try {
            deleteExpenseById(id);
          } catch (e) {
            setError(e);
            console(e);
          }
          swalWithBootstrapButtons.fire({
            title: "Deleted!",
            text: "Your expenses has been deleted.",
            icon: "success",
          });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire({
            title: "Delete cancelled ;)",
            text: "",
            icon: "error",
          });
        }
      });
  };

  const launchToast = (myEvent) => {
    const message = myEvent.message ? myEvent.message : myEvent.payload;
    if (myEvent.statusCode === 200 || myEvent.statusCode === 201) {
      toast.success(message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (myEvent.statusCode === 208) {
      toast.warn(message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (myEvent.statusCode === 404) {
      toast.error(message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  const verifyError = () => {
    if (error)
      new Swal({
        title: "Errore generico, Ritenta!",
        text: error.message,
        icon: "error",
        showLoaderOnConfirm: true,
        willClose: () => {
          setError(false);
        },
      });
  };

  useEffect(() => {
    try {
      getCategories();
      getUserExpenses(currentPage);
    } catch (e) {
      setError(e);
      verifyError(e);
    }
  }, [showModal, currentPage, deleted, error]);

  return (
    <>
      <Container>
        <div className="d-flex justify-content-between ">
          <motion.div
            initial={{ y: -40 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              type: "spring",
              damping: 10, // Damping controlla l'ammortizzazione dell'effetto, minore è il valore, maggiore è l'effetto di rimbalzo
              stiffness: 400, // Stiffness controlla la rigidità dell'effetto, maggiore è il valore, più rapida è l'animazione
              duration: 1, // Durata dell'animazione in secondi
            }}
          >
            <Menu openAddModal={openAddModal} openModifyModal={openModifyModal} />
          </motion.div>
          <motion.div
            className="pagination"
            initial={{ y: -40 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              type: "spring",
              damping: 10, // Damping controlla l'ammortizzazione dell'effetto, minore è il valore, maggiore è l'effetto di rimbalzo
              stiffness: 400, // Stiffness controlla la rigidità dell'effetto, maggiore è il valore, più rapida è l'animazione
              duration: 1, // Durata dell'animazione in secondi
            }}
          >
            <div className="d-flex justify-content-between align-items-center gap-2 ">
              <Button onClick={handlePrevPage} disabled={currentPage === 1} variant="outline-primary">
                <FontAwesomeIcon icon={faAnglesLeft} fontSize={20} />
              </Button>
              <span>Pagina {currentPage}</span>
              <Button onClick={handleNextPage} disabled={currentPage >= allUserExpenses.totalPages} variant="outline-primary">
                <FontAwesomeIcon icon={faAnglesRight} fontSize={20} />
              </Button>
            </div>
          </motion.div>
        </div>
        <motion.div initial={{ y: -50, opacity: 0 }} animate={{ y: 20, opacity: 1 }} transition={{ duration: 1, ease: [0.6, -0.05, 0.01, 0.99] }} className="max-height">
          <div className="col-lg-12 d-flex flex-column gap-3 px-3 ">
            {!allUserExpenses.expenses ? (
              <div>No expenses founded!</div>
            ) : allUserExpenses.expenses.length === 0 ? (
              <div>No expenses founded!</div>
            ) : (
              allUserExpenses.expenses.map((expense) => {
                let colorText = "white";
                const category = getCategoryById(expense.category);
                if (!category) return null;
                const c = getContrast("white", category.color);
                if (c < 2) {
                  colorText = "dark";
                }
                return (
                  <div className="form-control m-0 p-0 border-0 shadow bg-gradient bg-light" key={expense._id}>
                    <div className="d-flex justify-content-between rounded-top-1 pt-1 px-1" style={{ backgroundColor: category.color }}>
                      <div className={`text-${colorText} bold`}>
                        {category.categoryName.toUpperCase()}
                        {category.deleted ? " (category deleted)" : ""}
                      </div>
                      <div className="d-flex gap-2 ">
                        <FontAwesomeIcon icon={faShareNodes} color={colorText} className="custom-icon" onClick={() => openShareModal(expense)} />
                        {/* <FontAwesomeIcon icon={faPenToSquare} color="white" className="custom-icon" onClick={() => openModifyModal(expense._id)} /> */}
                        <FontAwesomeIcon icon={faTrashCan} color={colorText} className="custom-icon" onClick={() => verifyDelete(expense._id)} />
                      </div>
                    </div>
                    <div className="px-1">
                      <div className="d-flex justify-content-between">
                        <p className="mb-0">
                          Amount: <span>{expense.amount}€</span>
                        </p>
                        <p>{expense.opDate.split("T")[0]}</p>
                      </div>
                      <p>Other info: {expense.description}</p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </motion.div>
        <MyModal show={showModal} setShow={setShowModal} modalOp={modalOp} element={elementForModal} toast={launchToast} />
      </Container>
      <ToastContainer />
    </>
  );
};

export default Expenses;
