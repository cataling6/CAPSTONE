import { useState } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import React from "react";
import { Container } from "react-bootstrap";
import { motion } from "framer-motion";
import { jwtDecode } from "jwt-decode";

const Welcome = () => {
  const [show, setShow] = useState(true);
  const token = localStorage.getItem("authorized_user");
  const decoded = jwtDecode(token);

  return (
    <motion.main className="main__container" initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.7, ease: [0.6, -0.05, 0.01, 0.99] }}>
      <div>
        <Container>
          <Alert show={show} variant="success">
            <Alert.Heading> Hello {decoded.firsName}! Welcome to MyFinance App</Alert.Heading>

            <hr />
            <div className="d-flex justify-content-between">
              <div>Go to home for some instructions!</div>
              <Button as={Link} to="/home" onClick={() => setShow(false)} variant="outline-success">
                Home
              </Button>
            </div>
          </Alert>
        </Container>
      </div>
    </motion.main>
  );
};

export default Welcome;
