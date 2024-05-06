import React, { useState } from "react";
import { Button, Container } from "react-bootstrap";
import EditBox from "../Editbox/Editbox";
import AxiosClient from "../../modules/AxiosClient/client";
import Swal from "sweetalert2";
import "./style.css";
import { ToastContainer, toast, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
const { jwtDecode } = require("jwt-decode");

const Profile = () => {
  const client = new AxiosClient();
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const token = localStorage.getItem("authorized_user");
  let decoded = "";
  if (token) decoded = jwtDecode(token);

  const onChangeHandleFile = (e) => {
    const selectedFile = e.target.files[0];
    const reader = new FileReader();
    setFile(selectedFile);
    //mi serve per il preview della foto
    reader.onloadend = () => {
      setFilePreview(reader.result);
    };
    if (selectedFile) {
      reader.readAsDataURL(selectedFile);
    } else {
      setFilePreview(null);
    }
  };

  const uploadFile = async () => {
    const fileData = new FormData();
    fileData.append("uploadImg", file);

    try {
      const res = await client.postFormData(`${process.env.REACT_APP_SERVER_BASE_URL}/cloudUploadImg`, fileData);

      return await res;
    } catch (e) {
      throw new Error("Please select a file!");
    }
  };

  const saveChanges = async (e) => {
    const userId = decoded.userId;
    let bodyToSend;
    e.preventDefault();

    try {
      const uploadedFile = await uploadFile(file);
      bodyToSend = { imgProfile: uploadedFile.source };

      const res = await client.update(`${process.env.REACT_APP_SERVER_BASE_URL}/updateUser/${userId}`, JSON.stringify(bodyToSend));

      if (res.status === 200) {
        verifyUpload(res.data);
      }
      resetInput();
    } catch (e) {
      verifyError(e);
    }
  };

  const resetInput = () => {
    const element = document.getElementById("inputFile");
    element.value = "";
  };

  const verifyUpload = (res) => {
    new Swal({
      title: res.payload,
      icon: "success",
      showLoaderOnConfirm: true,
      willClose: () => {
        launchToast();
      },
    });
  };

  const verifyError = (res) => {
    new Swal({
      title: res.message,
      icon: "error",
      showLoaderOnConfirm: true,
    });
  };

  const launchToast = () => {
    toast.success("Modified data will be updated after logout", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Flip,
    });
  };

  return (
    <Container>
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
        Hello {decoded.firsName}, here you can update your profile foto!
      </motion.p>
      <motion.div className="row d-flex" initial={{ y: -50, opacity: 0 }} animate={{ y: 20, opacity: 1 }} transition={{ duration: 1, ease: [0.6, -0.05, 0.01, 0.99] }}>
        <div className="col-lg-7 align-content-center ">
          <form encType="multipart/form-data" onSubmit={saveChanges} className="d-flex flex-column gap-2 col-lg-12">
            <input name="uploadImg" type="file" className="form-control" onChange={onChangeHandleFile} id="inputFile" />
            <Button variant="outline-primary" type="submit" className="shadow">
              Send
            </Button>
          </form>
        </div>
        <div className="col-lg-5">
          <div className="profile-img ">{filePreview ? <img src={filePreview} className="shadow " /> : <img src={decoded.imgProfile} className="shadow " />}</div>
        </div>
      </motion.div>
      <ToastContainer />
    </Container>
  );
};

export default Profile;
