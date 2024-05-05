import React, { useContext, useState } from "react";
import { Button } from "react-bootstrap";
import EditBox from "../Editbox/Editbox";
import { CategoryCtx } from "../../contexts/category_ctx";
import { jwtDecode } from "jwt-decode";
import { SharedExpensesCtx } from "../../contexts/sharedExpenses_ctx";
const moment = require("moment");

const ShareExpense = ({ expense, setShow }) => {
  const { categories } = useContext(CategoryCtx);
  const { shareExpenseWith } = useContext(SharedExpensesCtx);
  const session = localStorage.getItem("authorized_user");
  const decodedSession = jwtDecode(session);
  moment.locale("it");
  const operationDate = moment(expense.opDate);
  const expCat = categories.find((c) => c._id === expense.category);
  const [formData, setFormData] = useState();
  const [error, setError] = useState(null);

  const handleOnChangeInput = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const submitSharedExpense = async (e) => {
    const preparedData = {
      ...formData,
      ownerId: decodedSession.userId,
      expenseId: expense._id,
    };
    e.preventDefault();
    try {
      await shareExpenseWith(preparedData);
    } catch (e) {
      setError(e);
    }
  };
  return (
    <>
      <div className="d-flex justify-content-between">
        <div className="d-flex justify-content-between mb-2">
          <span>Data Operazione: </span>
          <label> {operationDate.format("LL")}</label>
        </div>
        <div>
          <span>Costo: </span>
          <label>{expense.amount}</label>€
        </div>
      </div>
      <div className="mb-2">
        <span>Categoria: </span>
        <label>{expCat.categoryName}</label>
      </div>

      <form encType="multipart/form-data" onSubmit={submitSharedExpense}>
        <EditBox name="email" type={"email"} label={"User's email"} ph={"User's email"} col={12} mb={2} onChange={handleOnChangeInput} />
        <EditBox name="note" type={"textarea"} label={"Note"} ph={"Note"} col={12} mb={2} onChange={handleOnChangeInput} />
        <div className="d-flex justify-content-between mt-2">
          <Button variant="secondary" onClick={() => setShow(false)}>
            Close
          </Button>
          <Button variant="primary" type="submit" onClick={() => setShow(false)}>
            Share Expense
          </Button>
        </div>
      </form>
    </>
  ); /*onChange={handleOnChangeInput} */
};

export default ShareExpense;
