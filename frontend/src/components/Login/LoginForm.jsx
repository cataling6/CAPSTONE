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
      <div className="container p-5 col-12 col-sm-6 col-md-4 col-lg-4 d-flex justify-content-center ">
        <div className="form-control gy-2 row form-container ">
          <div className="backdrop-filter m-0">
            <form onSubmit={onSubmit} className="d-flex flex-column  gap-2 mt-5">
              <div className="col-12 col-sm-12 col-md-12 col-lg-12 form-floating ">
                <input data-testid="email" className="form-control col-lg-12" type="text" name="email" value={loginForm.email} onChange={onChangeInput} id="usr" placeholder="Email" />
                <label htmlFor="usr">Email</label>
              </div>
              <div className="col-12 col-sm-12 col-md-12 col-lg-12 form-floating ">
                <input data-testid="password" className="form-control" type="password" name="password" value={loginForm.password} onChange={onChangeInput} id="pwd" placeholder="Password" />
                <label htmlFor="pwd">Password</label>
              </div>
              <div className="">
                <button className="btn btn-primary col-12 col-sm-12 col-md-12 col-lg-12" data-testid="btnLogin">
                  Login
                </button>
              </div>
            </form>
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
