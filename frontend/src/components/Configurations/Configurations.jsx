import React, { useContext, useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import EditBox from "../Editbox/Editbox";
import "./style.css";
import { CategoryCtx } from "../../contexts/category_ctx";
import { getContrast } from "polished";
import Swal from "sweetalert2";
import { v4 as uuidv4 } from "uuid";
import { motion } from "framer-motion";
const Configurations = () => {
  const { categories, getCategories, addCategory, deleteCategory } = useContext(CategoryCtx);
  const [formData, setFormData] = useState({});
  const [deleted, setDeleted] = useState(false);

  const handleOnChangeInput = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const submitNewCategory = async (e) => {
    e.preventDefault();

    try {
      await addCategory(formData);
    } catch (e) {
      console.log(e);
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

  useEffect(() => {
    getCategories();
  }, [deleted]);
  return (
    <>
      <Container>
        <div className="d-flex justify-content-between gap-2">
          <div className="w-75">
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
              Actual Cat
            </motion.p>
            <motion.div className="d-flex gap-1 " initial={{ y: -50, opacity: 0 }} animate={{ y: 20, opacity: 1 }} transition={{ duration: 1, ease: [0.6, -0.05, 0.01, 0.99] }}>
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
          <div className="w-25">
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
              Create new cat
            </motion.p>
            <motion.div initial={{ y: -50, opacity: 0 }} animate={{ y: 20, opacity: 1 }} transition={{ duration: 1, ease: [0.6, -0.05, 0.01, 0.99] }}>
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
            </motion.div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Configurations;
