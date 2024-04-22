import React, { useContext, useEffect } from "react";
import { Button, Container } from "react-bootstrap";
import { useState } from "react";
import Menu from "../Menu/Menu";
import MyModal from "../Modal/Modal";
import { ExpensesCtx } from "../../contexts/expenses_ctx";
import { CategoryCtx } from "../../contexts/category_ctx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import "./style.css";
const Expenses = () => {
  const { expenses, getExpenses, deleteExpenseById } = useContext(ExpensesCtx);
  const { categories, getCategories } = useContext(CategoryCtx);
  const [showModal, setShowModal] = useState(false);
  const [modalOp, setModalOp] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const openModal = () => setShowModal(true);

  const openAddModal = () => {
    setShowModal(true);
    setModalOp("add");
  };

  const openModifyModal = () => {
    setShowModal(true);
    setModalOp("edit");
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
  const deleteExpense = async (id) => {
    await deleteExpenseById(id);
  };

  useEffect(() => {
    getExpenses(currentPage);
    getCategories();
  }, [showModal, currentPage]);

  return (
    <>
      <Container>
        <Menu openAddModal={openAddModal} openModifyModal={openModifyModal} />
        <motion.div
          className="pagination"
          animate={{ y: 10, opacity: 1 }}
          transition={{
            type: "spring", // Usa una transizione di tipo "spring"
            damping: 10, // Damping controlla l'ammortizzazione dell'effetto, minore è il valore, maggiore è l'effetto di rimbalzo
            stiffness: 400, // Stiffness controlla la rigidità dell'effetto, maggiore è il valore, più rapida è l'animazione
            duration: 1, // Durata dell'animazione in secondi
          }}
        >
          <div className="d-flex justify-content-between align-items-center gap-2 ">
            <Button onClick={handlePrevPage} disabled={currentPage === 1} size="sm">
              Pagina precedente
            </Button>
            <span>Pagina {currentPage}</span>
            <Button onClick={handleNextPage} disabled={currentPage === expenses.totalPages} size="sm">
              Pagina successiva
            </Button>
          </div>
        </motion.div>
        <motion.div initial={{ y: -50, opacity: 0 }} animate={{ y: 20, opacity: 1 }} transition={{ duration: 1, ease: [0.6, -0.05, 0.01, 0.99] }}>
          <div className="col-lg-12 d-flex flex-column gap-3">
            {!expenses.expenses ? (
              <div>Loading...</div>
            ) : expenses.expenses.length === 0 ? (
              <div>No expenses founded!</div>
            ) : (
              expenses.expenses.map((expense) => {
                const category = getCategoryById(expense.category);
                if (!category) return null;
                return (
                  <div className="form-control m-0 p-0 border-0 shadow" key={expense._id}>
                    <div className="d-flex justify-content-between rounded-top-1 pt-1 px-1" style={{ backgroundColor: category.color }}>
                      <div className="text-white bold">{category.categoryName.toUpperCase()}</div>
                      <div className="d-flex gap-2 ">
                        <FontAwesomeIcon icon={faPenToSquare} color="white" />
                        <FontAwesomeIcon icon={faTrashCan} color="white" onClick={() => deleteExpense(expense._id)} />
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
        <MyModal show={showModal} setShow={setShowModal} modalOp={modalOp} />
      </Container>
    </>
  );
};

export default Expenses;
