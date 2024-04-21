import React, { useState } from "react";
import EditBox from "../Editbox/Editbox";
import "./style.css";
const AddExpense = () => {
  const [formData, setFormData] = useState({});
  console.log(formData);
  const handleOnChangeInput = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <>
      <form>
        <div className="row">
          <EditBox name="amount" type={"number"} label={"Amount"} inputId={"amnt"} ph={"Abount"} col={4} mb={2} onChange={handleOnChangeInput} />
          <EditBox name="opDate" type={"date"} label={"Date of operation"} inputId={"opDate"} col={8} onChange={handleOnChangeInput} />
          <EditBox name="desc" type={"textarea"} label={"Description"} inputId={"desc"} onChange={handleOnChangeInput} />
        </div>
      </form>
    </>
  );
};

export default AddExpense;
