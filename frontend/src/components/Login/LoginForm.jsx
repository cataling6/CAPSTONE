import { useState } from "react";
import { motion } from "framer-motion";
import React from "react";
import AxiosClient from "../../modules/AxiosClient/client";
import EditBox from "../Editbox/Editbox";
import Swal from "sweetalert2";
import "./style.css";
import { useNavigate } from "react-router-dom";

const LoginForm = ({ toggleForm }) => {
  const navigate = useNavigate();
  const client = new AxiosClient();
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
        localStorage.setItem("authorized_user", JSON.stringify(res.token));
        navigate("/welcome");
        setToken(res.token);
        setInterval(() => {}, 1000);
      }
    } catch (e) {
      verifyError(e.response.data.message);
    }
  };

  const verifyError = (error) => {
    new Swal({
      title: error,
      text: "Check username / password and try again!",
      icon: "error",
      showLoaderOnConfirm: true,
    });
  };

  return (
    <>
      <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.5, ease: [0, 0.71, 0.2, 1.01] }}>
        <div className="login-box">
          <h2>Login</h2>
          <form>
            <EditBox name={"email"} type={"email"} ph={"E-mail"} onChange={onChangeInput} label={"E-mail"} col={12} inputId={"eml"} customClasses={"user-box"} login={true} />
            <EditBox name={"password"} type={"password"} ph={"Password"} onChange={onChangeInput} label={"Password"} col={12} inputId={"pwd"} customClasses={"user-box"} login={true} />
            <div className="d-flex justify-content-between ">
              <a onClick={() => toggleForm()}>Signup</a>
              <a onClick={onSubmit}>Login</a>
            </div>
          </form>
        </div>
      </motion.div>
    </>
  );
};

export default LoginForm;
