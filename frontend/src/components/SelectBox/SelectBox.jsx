import React from "react";

const SelectBox = (props) => {
  const categories = props.categories;
  let defaultClass = `col-lg-${props.col}`;
  return (
    <div className={defaultClass}>
      <select className="form-select mb-2" onChange={props.onChange} name="category">
        <option disabled selected>
          Select element
        </option>
        {categories.map((cat) => {
          return (
            <option hidden={cat.deleted} value={cat._id}>
              {cat.categoryName.toLowerCase().charAt(0).toUpperCase() + cat.categoryName.slice(1)}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default SelectBox;
