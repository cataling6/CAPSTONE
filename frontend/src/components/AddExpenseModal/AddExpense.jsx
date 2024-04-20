import React from "react";
import EditBox from "../Editbox/Editbox";
import "./style.css";
const AddExpense = () => {
  return (
    <>
      <form>
        <div className="row">
          <EditBox name="amount" type={"number"} label={"Amount"} inputId={"amnt"} ph={"Abount"} col={4} mb={2} />
          <EditBox name="opDate" type={"date"} label={"Date of operation"} inputId={"opDate"} col={8} />
          <EditBox name="desc" type={"textarea"} label={"Description"} inputId={"desc"} />
        </div>
      </form>
    </>
  );
};

export default AddExpense;
