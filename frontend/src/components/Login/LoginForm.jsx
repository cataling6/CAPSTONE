import { useState } from "react";
import { motion } from "framer-motion";
import React from "react";
import AxiosClient from "../../modules/AxiosClient/client";
import EditBox from "../Editbox/Editbox";
import Swal from "sweetalert2";
import "./style.css";
const LoginForm = ({ toggleForm }) => {
  const client = new AxiosClient();
  const [error, setError] = useState(false);
  const [token, setToken] = useState(false);
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setLoginForm({
      ...loginForm,
      [name]: value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await client.post("/login", loginForm);
      if (res.token) {
        localStorage.setItem("auth", JSON.stringify(res.token));
        setToken(res.token);
        setInterval(() => {
          window.location.href = "/home";
        }, 1000);
      }
    } catch (e) {
      setError(e);
    }
  };
  return (
    <>
      <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.5, ease: [0, 0.71, 0.2, 1.01] }}>
        <div className="login-box">
          <h2>Login</h2>
          <form>
            <EditBox name={"email"} type={"email"} onChange={onChangeInput} label={"E-mail"} col={12} inputId={"eml"} customClasses={"user-box"} />
            <EditBox name={"password"} type={"password"} onChange={onChangeInput} label={"Password"} col={12} inputId={"pwd"} customClasses={"user-box"} />
            <div className="d-flex justify-content-between ">
              <a href="#">Login</a>
              <a href="#" onClick={() => toggleForm()}>
                Signup
              </a>
            </div>
          </form>
        </div>
      </motion.div>
    </>
  );
};

export default LoginForm;
