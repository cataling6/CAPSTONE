import React, { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import EditBox from "../Editbox/Editbox";
import SelectBox from "../SelectBox/SelectBox";
import { CategoryCtx } from "../../contexts/category_ctx";
import { ExpensesCtx } from "../../contexts/expenses_ctx";
import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2";
import "./style.css";
const AddExpense = ({ setShow }) => {
  const { categories, getCategories } = useContext(CategoryCtx);
  const { addExpense } = useContext(ExpensesCtx);
  const [error, setError] = useState(null);
  const session = localStorage.getItem("authorized_user");
  const decodedSession = jwtDecode(session);
  const [formData, setFormData] = useState({ opDate: new Date().toISOString().split("T")[0] }); // mi imposto la data di default a oggi; non saprei come gestirlo visto che se la spesa è inserita con data odierna, questo valore in qualche modo deve essere inserito

  const handleOnChangeInput = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const submitExpense = async (e) => {
    const preparedData = {
      ...formData,
      userId: decodedSession.userId,
    };
    e.preventDefault();
    try {
      const res = await addExpense(preparedData);
    } catch (e) {
      setError(e);
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
    getCategories();
    verifyError();
  }, [error]);

  return (
    <>
      <form encType="multipart/form-data" onSubmit={submitExpense}>
        <div className="row">
          <EditBox name="amount" type={"number"} label={"Amount"} inputId={"amnt"} ph={"Abount"} col={4} mb={2} onChange={handleOnChangeInput} />
          <EditBox name="opDate" type={"date"} label={"Date of operation"} inputId={"opDate"} col={8} onChange={handleOnChangeInput} />
          <SelectBox col={12} categories={categories} onChange={handleOnChangeInput} />
          <EditBox name="description" type={"textarea"} label={"Description"} inputId={"desc"} onChange={handleOnChangeInput} />
        </div>
        <div className="d-flex justify-content-between mt-2">
          <Button variant="secondary" onClick={() => setShow(false)}>
            Close
          </Button>
          <Button variant="primary" type="submit" onClick={() => setShow(false)}>
            Save Changes
          </Button>
        </div>
      </form>
    </>
  );
};

export default AddExpense;
