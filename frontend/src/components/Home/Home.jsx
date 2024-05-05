import React from "react";
import Welcome from "../Welcome/Welcome";
import { Container } from "react-bootstrap";
const { jwtDecode } = require("jwt-decode");
const Home = () => {
  const userData = localStorage.getItem("authorized_user");
  let decoded = jwtDecode(userData);

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-lg-3">
            <input type="text" className="form-control col-lg-3 " />
          </div>
          <div className="col-lg-3">
            <input type="text" className="form-control col-lg-3 " />
          </div>
          <div className="col-lg-3">
            <input type="text" className="form-control col-lg-3 " />
          </div>
          <div className="col-lg-3">
            <input type="text" className="form-control col-lg-3 " />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
