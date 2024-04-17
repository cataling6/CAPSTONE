import React from "react";
import { useState } from "react";
import AxiosClient from "../../modules/AxiosClient/client";
import { motion } from "framer-motion";
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
      {/* <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 50, opacity: 1 }} transition={{ duration: 1, ease: [0.6, -0.05, 0.01, 0.99] }}> */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          delay: 0.5,
          ease: [0, 0.71, 0.2, 1.01],
        }}
      >
        <div className="login-box">
          <h2>Login</h2>
          <form>
            <div className="user-box">
              <input type="text" name="" required="" />
              <label>Username</label>
            </div>
            <div className="user-box">
              <input type="password" name="" required="" />
              <label>Password</label>
            </div>
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
