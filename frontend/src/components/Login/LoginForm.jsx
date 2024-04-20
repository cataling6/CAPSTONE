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
  const [error, setError] = useState(false);
  const [token, setToken] = useState(false);
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  console.log(loginForm);
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
        console.log(JSON.stringify(res.token));
        localStorage.setItem("authorized_user", JSON.stringify(res.token));

        navigate("/welcome");
        setToken(res.token);

        setInterval(() => {}, 1000);
      }
    } catch (e) {
      console.log(e);
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
              <a onClick={onSubmit}>Login</a>

              <a onClick={() => toggleForm()}>Signup</a>
            </div>
          </form>
        </div>
      </motion.div>
    </>
  );
};

export default LoginForm;
