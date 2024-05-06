import React from "react";
import EditBox from "../Editbox/Editbox";
import AxiosClient from "../../modules/AxiosClient/client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
const SignupForm = ({ toggleForm }) => {
  const [signupFormData, setSignupFormData] = useState({});

  const client = new AxiosClient();
  const onChangeInput = (e) => {
    const { name, value } = e.target;
    const newValue = name === "age" ? Number(value) : value;
    setSignupFormData({
      ...signupFormData,
      [name]: newValue,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await client.post("/createUser", signupFormData);
      if (res.statusCode == 201) {
        verifyCreate(res.payload);
      } else if (res.statusCode == 208) {
        verifyError(res.message);
      }
    } catch (e) {
      console.log(e.response.data);
      verifyError(e.response.data);
    }
  };

  const verifyError = (error) => {
    new Swal({
      title: "Generic Error",
      text: error.errors[0],
      icon: "error",
      showLoaderOnConfirm: true,
    });
  };

  const verifyCreate = (res) => {
    new Swal({
      title: res,
      text: "Please do login",
      icon: "success",
      showLoaderOnConfirm: true,
      willClose: () => {
        toggleForm();
      },
    });
  };

  useEffect(() => {}, []);
  return (
    <>
      {/* <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 50, opacity: 1 }} transition={{ duration: 1, ease: [0.6, -0.05, 0.01, 0.99] }}> */}
      <motion.div initial={{ y: 100, opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.5, ease: [0, 0.71, 0.2, 1.01] }}>
        <div className="login-box">
          <h2>Signup</h2>
          <form>
            <EditBox name={"firstName"} type={"text"} onChange={onChangeInput} label={"Firstname"} ph={"Firstname"} col={12} inputId={"fsn"} customClasses={"user-box"} login={true} />
            <EditBox name={"lastName"} type={"text"} onChange={onChangeInput} label={"Lastname"} ph={"Lastname"} col={12} inputId={"lsn"} customClasses={"user-box"} login={true} />
            <EditBox name={"email"} type={"mail"} onChange={onChangeInput} label={"E-mail"} ph={"E-mail"} col={12} inputId={"eml"} customClasses={"user-box"} login={true} />
            <EditBox name={"password"} type={"password"} onChange={onChangeInput} label={"Password"} ph={"Password"} col={12} inputId={"pwd"} customClasses={"user-box"} login={true} />
            <div className="d-flex justify-content-between ">
              <a onClick={onSubmit}>Create</a>
              <a onClick={() => toggleForm()}>Login</a>
            </div>
          </form>
        </div>
      </motion.div>
    </>
  );
};

export default SignupForm;
