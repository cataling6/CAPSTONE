import React, { useContext, useEffect, useRef, useState } from "react";
import { Button, Container } from "react-bootstrap";
import EditBox from "../Editbox/Editbox";
import "./style.css";
import { CategoryCtx } from "../../contexts/category_ctx";
import { getContrast } from "polished";
import Swal from "sweetalert2";
import { v4 as uuidv4 } from "uuid";

const Configurations = () => {
  const { categories, getCategories, addCategory, deleteCategory } = useContext(CategoryCtx);
  const [formData, setFormData] = useState({});
  const [deleted, setDeleted] = useState(false);
  const [elementToBeDeleted, setElementToBeDeleted] = useState();
  const [error, setError] = useState(false);

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

  const verifyDelete = (e) => {
    const myElement = e.target.id;
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger me-2",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: `<b>Sto cancellando una spesa</b>`,
        text: "Vuoi davvero cancellare questa spesa?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Si!",
        cancelButtonText: "No!",
        reverseButtons: true,
        willClose: () => {
          setDeleted(false);
        },
      })
      .then((result) => {
        if (result.isConfirmed) {
          try {
            deleteCategory(myElement);
          } catch (e) {
            setError(e);
            console(e);
          }
          swalWithBootstrapButtons.fire({
            title: "Deleted!",
            text: "Your expenses has been deleted.",
            icon: "success",
          });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire({
            title: "Cancellazione annullata",
            text: "",
            icon: "error",
          });
        }
      });
  };

  useEffect(() => {
    getCategories();
  }, [deleted]);
  return (
    <>
      <Container>
        <div className="d-flex justify-content-between gap-2">
          <div className="w-75">
            <p>Actual Cat</p>
            <div className="d-flex gap-1 ">
              {categories == "" || categories == null ? (
                <div className="text-dark">No categories have been configured</div>
              ) : (
                categories.map((cat) => {
                  let colorText = "white";
                  const c = getContrast("white", cat.color);
                  if (c < 2) {
                    colorText = "black";
                  }
                  return (
                    <div key={uuidv4()}>
                      <span id={cat._id} style={{ backgroundColor: `${cat.color}`, color: colorText }} className="rounded rounded-5 px-2  my-1 border border-1 border-black " onClick={verifyDelete}>
                        {cat.categoryName.toUpperCase()}
                      </span>
                    </div>
                  );
                })
              )}
            </div>
          </div>
          <div className="w-25">
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
