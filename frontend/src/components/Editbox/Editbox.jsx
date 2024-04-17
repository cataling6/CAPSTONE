import React from "react";

const EditBox = (props) => {
  let defaultClass = `form-floating col-lg-${props.col}`;
  const inputClass = props.customClasses != null ? props.customClasses : "form-control";

  const typeControl = props.type;
  return (
    <>
      <div className={inputClass ? inputClass : defaultClass}>
        {typeControl === "textarea" ? <textarea className={inputClass} name={props.name} placeholder={props.ph} onChange={props.onChange} value={props.inputData} rows={10} id={props.inputId} /> : <input className={inputClass} name={props.name} type={props.type} placeholder={props.ph} onChange={props.onChange} value={props.inputData} id={props.inputId} />}
        <label htmlFor={props.inputId}>{props.label}</label>
      </div>
    </>
  );
};

export default EditBox;
