import React from "react";
import { useState } from "react";
import AxiosClient from "../../modules/AxiosClient/client";
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
      <div className="container p-5 col-12 col-sm-12 col-md-12 col-lg-12">
        <div className="form-control col-12 col-sm-12 col-md-12 col-lg-12 gy-2 row">
          <form onSubmit={onSubmit}>
            <div className="col-12 col-sm-12 col-md-12 col-lg-12">
              <label>
                <b>Email:</b>
              </label>
              <input data-testid="email" className="form-control col-lg-12" type="text" name="email" value={loginForm.email} onChange={onChangeInput} />
            </div>
            <div className="col-12 col-sm-12 col-md-12 col-lg-12">
              <label>
                <b>Password:</b>
              </label>
              <input data-testid="password" className="form-control" type="password" name="password" value={loginForm.password} onChange={onChangeInput} />
            </div>
            <div className="mt-2">
              <button className="btn btn-primary col-lg-12" data-testid="btnLogin">
                Login
              </button>
            </div>
          </form>
          <div className="d-flex justify-content-center">
            <span>or</span>
          </div>

          <div onClick={() => toggleForm()}>
            {/*eslint-disable-next-line*/}
            <a href="#" className="text-dark fw-bold ms-1">
              Registrati ora
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
