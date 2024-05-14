import React from "react";
import { useState } from "react";
import "./style.css";

const EditBox = (props) => {
  const [inputValue, setInputValue] = useState(new Date().toISOString().split("T")[0]);
  let defaultClass = `form-floating col-lg-${props.col}`;
  let inputClass;
  let typeControl;

  const handleOnChangeInput = (e) => {
    setInputValue(e.target.value); // Aggiorna il valore dell'input quando viene modificato; se no di default rimane la data "oggi" come sopra definito

    if (props.onChange) {
      props.onChange(e);
    }
  };

  inputClass = props.customClasses != null ? props.customClasses : "";
  typeControl = props.type;
  return (
    <>
      <div className={inputClass.length === 0 ? defaultClass : inputClass}>
        {typeControl === "textarea" ? (
          <textarea className={inputClass.length === 0 ? "form-control" : ""} name={props.name} placeholder={props.ph} onChange={handleOnChangeInput} value={props.inputData} rows={40} id={props.inputId} />
        ) : typeControl === "date" ? (
          <input autoComplete="false" className={inputClass.length === 0 ? `form-control mb-${props.mb}` : inputClass} name={props.name} type={props.type} placeholder={props.ph} onChange={handleOnChangeInput} value={inputValue} id={props.inputId} step="0.01" />
        ) : (
          <input autoComplete="false" className={inputClass.length === 0 ? `form-control mb-${props.mb}` : inputClass} name={props.name} type={props.type} placeholder={props.ph} onChange={handleOnChangeInput} id={props.inputId} step="0.01" />
        )}
        <label htmlFor={props.inputId}>{props.label}</label>
      </div>
    </>
  );
};

export default EditBox;
