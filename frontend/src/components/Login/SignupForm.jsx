import React from "react";
import EditBox from "../Editbox/Editbox";
import AxiosClient from "../../modules/AxiosClient/client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const SignupForm = ({ toggleForm }) => {
  const [signupFormData, setSignupFormData] = useState({});
  const [isCreated, setIsCreated] = useState(false);
  const [error, setError] = useState();
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
      const res = await client.post("/users/createUser", signupFormData);
      if (res.statusCode == 201) {
        setIsCreated(true); //needed for SWAL input
      }
    } catch (e) {
      setError(e); //needed for SWAL input
    }
  };
  return (
    <>
      {/* <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 50, opacity: 1 }} transition={{ duration: 1, ease: [0.6, -0.05, 0.01, 0.99] }}> */}
      <motion.div initial={{ y: 100, opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.5, ease: [0, 0.71, 0.2, 1.01] }}>
        <div className="login-box">
          <h2>Signup</h2>
          <form>
            <EditBox name={"firstName"} type={"text"} onChange={onChangeInput} label={"Firstname"} col={12} inputId={"fsn"} customClasses={"user-box"} />
            <EditBox name={"lastName"} type={"text"} onChange={onChangeInput} label={"Lastname"} col={12} inputId={"lsn"} customClasses={"user-box"} />
            <EditBox name={"email"} type={"mail"} onChange={onChangeInput} label={"E-mail"} col={12} inputId={"eml"} customClasses={"user-box"} />
            <EditBox name={"password"} type={"password"} onChange={onChangeInput} label={"Password"} col={12} inputId={"pwd"} customClasses={"user-box"} />
            <div className="d-flex justify-content-between ">
              <a href="#">Submit</a>
              <a href="#" onClick={() => toggleForm()}>
                Register
              </a>
            </div>
          </form>
        </div>
      </motion.div>
    </>
  );
};

export default SignupForm;
