import React, { useContext, useEffect, useRef, useState } from "react";
import { Button, Container } from "react-bootstrap";
import EditBox from "../Editbox/Editbox";
import "./style.css";
import { CategoryCtx } from "../../contexts/category_ctx";

const Configurations = () => {
  const { categories, getCategories, addCategory } = useContext(CategoryCtx);
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);

  const handleOnChangeInput = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const submitNewCategory = async (e) => {
    e.preventDefault();

    const preparedData = {
      ...formData,
    };
    try {
      await addCategory(formData);
    } catch (e) {
      console.log(e);
      setError(e);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);
  return (
    <>
      <Container>
        <h2>Categories</h2>
        <div className="d-flex justify-content-between ">
          <div>
            <p>Actual Cat</p>
            <div>
              {categories.map((cat) => {
                return (
                  <div>
                    <span style={{ backgroundColor: `${cat.color}`, color: "white" }} className="rounded rounded-5 px-2  my-1 ">
                      {cat.categoryName.toUpperCase()}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
          <div>
            <p>Create new cat</p>
            <div>
              <form encType="multipart/form-data" onSubmit={submitNewCategory}>
                <div className="row">
                  <EditBox name="categoryName" type={"text"} label={"Category Name"} inputId={"cat"} ph={"Category Name"} col={12} mb={2} onChange={handleOnChangeInput} />
                  {/* <EditBox name="color" type={"color"} label={"Category Color"} inputId="catCol" col={12} mb={2} onChange={handleOnChangeInput} /> */}
                  <div className="col-lg-12">
                    <label>Category Color</label>
                    <input type="color" name="color" className="col-lg-12 form-control" onChange={handleOnChangeInput} />
                  </div>
                </div>
                <div className="mt-2 d-flex justify-content-end ">
                  <Button type="submit" variant="outline-primary">
                    Save
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Configurations;
