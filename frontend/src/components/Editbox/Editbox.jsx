import React from "react";

const EditBox = (props) => {
  let defaultClass = `form-floating col-lg-${props.col}`;
  let inputClass;
  let typeControl;

  inputClass = props.customClasses != null ? props.customClasses : "";
  typeControl = props.type;
  return (
    <>
      <div className={inputClass.length === 0 ? defaultClass : inputClass}>
        {typeControl === "textarea" ? (
          <textarea className={inputClass.length === 0 ? "form-control" : ""} name={props.name} placeholder={props.ph} onChange={props.onChange} value={props.inputData} rows={10} id={props.inputId} />
        ) : (
          <input autoComplete="false" className={inputClass.length === 0 ? `form-control mb-${props.mb}` : inputClass} name={props.name} type={props.type} placeholder={props.ph} onChange={props.onChange} value={props.inputData} id={props.inputId} />
        )}
        <label htmlFor={props.inputId}>{props.label}</label>
      </div>
    </>
  );
};

export default EditBox;
