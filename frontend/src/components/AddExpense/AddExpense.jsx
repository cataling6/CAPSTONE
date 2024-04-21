import React, { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import EditBox from "../Editbox/Editbox";
import SelectBox from "../SelectBox/SelectBox";
import { CategoryCtx } from "../../contexts/category_ctx";
import { ExpensesCtx } from "../../contexts/expenses_ctx";
import { jwtDecode } from "jwt-decode";
import useSession from "../../hooks/useSession";
import "./style.css";
const AddExpense = (props) => {
  const { categories, getCategories } = useContext(CategoryCtx);
  const { addExpense } = useContext(ExpensesCtx);
  const session = localStorage.getItem("authorized_user");
  const decodedSession = jwtDecode(session);
  const [formData, setFormData] = useState({});

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
      let res = await addExpense(preparedData);

      if (res.statusCode === 201) {
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      <form encType="multipart/form-data" onSubmit={submitExpense}>
        <div className="row">
          <EditBox name="amount" type={"number"} label={"Amount"} inputId={"amnt"} ph={"Abount"} col={4} mb={2} onChange={handleOnChangeInput} />
          <EditBox name="opDate" type={"date"} label={"Date of operation"} inputId={"opDate"} col={8} onChange={handleOnChangeInput} />
          <SelectBox col={12} categories={categories} onChange={handleOnChangeInput} />
          <EditBox name="desc" type={"textarea"} label={"Description"} inputId={"desc"} onChange={handleOnChangeInput} />
        </div>
        <div className="d-flex justify-content-between mt-2">
          <Button variant="secondary" onClick={() => props.setShow(false)}>
            Close
          </Button>
          <Button variant="primary" type="submit" onClick={() => props.setShow(false)}>
            Save Changes
          </Button>
        </div>
      </form>
    </>
  );
};

export default AddExpense;
