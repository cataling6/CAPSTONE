import React from "react";
import Welcome from "../Welcome/Welcome";
import { Container } from "react-bootstrap";
const { jwtDecode } = require("jwt-decode");
const Home = () => {
  const userData = localStorage.getItem("authorized_user");
  let decoded = jwtDecode(userData);
  console.log(decoded);
  return (
    <>
      <Container>
        <div>ciaooo</div>
      </Container>
    </>
  );
};

export default Home;
