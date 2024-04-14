import { useState } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";

import React from "react";
import { Container } from "react-bootstrap";
import { motion } from "framer-motion";

const Welcome = () => {
  const [show, setShow] = useState(true);
  return (
    <motion.main className="main__container" initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.7, ease: [0.6, -0.05, 0.01, 0.99] }}>
      <div>
        <Container>
          <Alert show={show} variant="success">
            <Alert.Heading>My Alert</Alert.Heading>
            <p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Cras mattis consectetur purus sit amet fermentum.</p>
            <hr />
            <div className="d-flex justify-content-end">
              <Button onClick={() => setShow(false)} variant="outline-success">
                Close me
              </Button>
            </div>
          </Alert>

          {/* {!show && <Button onClick={() => setShow(true)}>Show Alert</Button>} */}
        </Container>
      </div>
    </motion.main>
  );
};

export default Welcome;
