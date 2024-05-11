import { Button, Container } from "react-bootstrap";
import { CategoryCtx } from "../../contexts/category_ctx";
import { getContrast } from "polished";
import { v4 as uuidv4 } from "uuid";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import React, { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import EditBox from "../Editbox/Editbox";

import "./style.css";
import "react-toastify/dist/ReactToastify.css";
const { jwtDecode } = require("jwt-decode");

const Configurations = () => {
  const { categories, getCategories, addCategory, deleteCategory } = useContext(CategoryCtx);
  const token = localStorage.getItem("authorized_user");
  let decoded = "";
  if (token) decoded = jwtDecode(token);
  const [formData, setFormData] = useState({ color: "#000000", userId: decoded.userId });
  const [deleted, setDeleted] = useState(false);

  console.log(decoded.userId);
  const handleOnChangeInput = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  console.log(formData);
  const submitNewCategory = async (e) => {
    e.preventDefault();

    try {
      const res = await addCategory(formData);
      if (res.statusCode === 201) {
        launchToast(res);
      } else if (res.response.data.statusCode === 500) {
        launchToast(res.response.data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const verifyDelete = (e) => {
    const myElement = e.target.id;
    const textElement = e.target.innerText;
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger me-2",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: `<b>I'm deleting the category </b>'${textElement}'`,
        text: "Do you confirm?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Yes!",
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
            console(e);
          }
          swalWithBootstrapButtons.fire({
            title: "Deleted!",
            text: "Your category has been deleted.",
            icon: "success",
          });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire({
            title: "Operation cancelled! ;)",
            text: "",
            icon: "error",
          });
        }
      });
  };

  const launchToast = (myEvent) => {
    const message = myEvent.message ? myEvent.message : myEvent.payload;
    if (myEvent.statusCode === 200 || myEvent.statusCode === 201) {
      toast.success(message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (myEvent.statusCode === 208) {
      toast.warn(message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (myEvent.statusCode === 404) {
      toast.error(message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (myEvent.statusCode === 500) {
      toast.error("Verify data! color is required", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };
  useEffect(() => {
    getCategories();
  }, [deleted]);
  return (
    <>
      <Container>
        <div className="d-flex flex-column flex-sm-column flex-md-column flex-lg-row justify-content-between ">
          <div className="col-12 col-sm-12 col-md-12 col-lg-8">
            <motion.p
              initial={{ y: -40 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                type: "spring",
                damping: 10, // Damping controlla l'ammortizzazione dell'effetto, minore è il valore, maggiore è l'effetto di rimbalzo
                stiffness: 400, // Stiffness controlla la rigidità dell'effetto, maggiore è il valore, più rapida è l'animazione
                duration: 1, // Durata dell'animazione in secondi
              }}
            >
              <h5 className=" fw-bold text-primary">Available categories</h5>
            </motion.p>
            <motion.div className="d-flex gap-1 flex-wrap mb-5" initial={{ y: -50, opacity: 0 }} animate={{ y: 20, opacity: 1 }} transition={{ duration: 1, ease: [0.6, -0.05, 0.01, 0.99] }}>
              {categories === "" || categories === null ? (
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
            </motion.div>
          </div>
          <div className="col-12 col-sm-12 col-md-12 col-lg-4">
            <motion.p
              initial={{ y: -40 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                type: "spring",
                damping: 10, // Damping controlla l'ammortizzazione dell'effetto, minore è il valore, maggiore è l'effetto di rimbalzo
                stiffness: 400, // Stiffness controlla la rigidità dell'effetto, maggiore è il valore, più rapida è l'animazione
                duration: 1, // Durata dell'animazione in secondi
              }}
            >
              <h5 className="d-flex fw-bold text-primary"> Create new cat</h5>
            </motion.p>
            <motion.div initial={{ y: -50, opacity: 0 }} animate={{ y: 20, opacity: 1 }} transition={{ duration: 1, ease: [0.6, -0.05, 0.01, 0.99] }}>
              <form encType="multipart/form-data" onSubmit={submitNewCategory}>
                <div className="row">
                  <div className="col-lg-12 mb-2 ">
                    <label htmlFor="colorPicker">Category Color</label>
                    <input id="colorPicker" type="color" name="color" className="col-lg-12 form-control " onChange={handleOnChangeInput} />
                  </div>
                  <EditBox name="categoryName" type={"text"} label={"Category Name"} inputId={"cat"} ph={"Category Name"} col={12} mb={2} onChange={handleOnChangeInput} />
                </div>
                <div className="mt-2 d-flex justify-content-end ">
                  <Button type="submit" variant="outline-primary col-12 col-sm-12 col-md-12 ">
                    Save
                  </Button>
                </div>
              </form>
              <div>By clicking on a category, you will be able to delete it!</div>
            </motion.div>
          </div>
        </div>
        <ToastContainer />
      </Container>
    </>
  );
};

export default Configurations;
