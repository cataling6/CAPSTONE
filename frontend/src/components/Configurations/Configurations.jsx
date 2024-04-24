import React, { useContext, useEffect, useRef } from "react";
import { Badge, Button, Container } from "react-bootstrap";
import EditBox from "../Editbox/Editbox";
import "./style.css";
import { CategoryCtx } from "../../contexts/category_ctx";

const Configurations = () => {
  const { categories, getCategories } = useContext(CategoryCtx);
  const handleOnChangeInput = () => {};
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
              <form encType="multipart/form-data">
                <div className="row">
                  <EditBox name="categoryName" type={"text"} label={"Category Name"} inputId={"cat"} ph={"Category Name"} col={12} mb={2} onChange={handleOnChangeInput} />
                  {/* <EditBox name="color" type={"color"} label={"Category Color"} inputId="catCol" col={12} mb={2} onChange={handleOnChangeInput} /> */}
                  <div className="col-lg-12">
                    <label>Category Color</label>
                    <input type="color" className="col-lg-12 form-control" />
                  </div>
                </div>
                <div className="mt-2 d-flex justify-content-end ">
                  <Button variant="outline-primary">Save</Button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <h2>Shared Expenses</h2>
      </Container>
    </>
  );
};

export default Configurations;
