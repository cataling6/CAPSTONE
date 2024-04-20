import React from "react";
import EditBox from "../Editbox/Editbox";
import { Container } from "react-bootstrap";
import "./style.css";
const AddExpense = () => {
  return (
    <>
      <form>
        <Container>
          <div className="login-box">
            <EditBox name="amount" type={"number"} label={"Amount"} inputId={"amnt"} customClasses={"user-box"} ph={"Abount"} />
            <EditBox name="opDate" type={"date"} label={"Date of operation"} inputId={"opDate"} customClasses={"user-box"} />
            <EditBox name="desc" type={"textarea"} label={"Description"} inputId={"desc"} customClasses={"user-box"} />
            {/*  <EditBox name={"firstName"} type={"text"} onChange={onChangeInput} label={"Firstname"} col={12} inputId={"fsn"} customClasses={"user-box"} /> */}
          </div>
          <div className="form-floating">
            <input id="1" placeholder="aaa" className="form-control" />
            <label htmlFor="1">aaa</label>
          </div>
        </Container>
      </form>
    </>
  );
};

export default AddExpense;
