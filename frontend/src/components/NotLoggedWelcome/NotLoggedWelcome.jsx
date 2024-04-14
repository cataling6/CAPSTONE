import React from "react";
import { Button, Container } from "react-bootstrap";
import { motion } from "framer-motion";

const NotLoggedWelcome = () => {
  return (
    <>
      <motion.main className="main__container" initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.7, ease: [0.6, -0.05, 0.01, 0.99] }}>
        <Container>
          <Button variant="primary">ciaooo</Button>
        </Container>
      </motion.main>
    </>
  );
};

export default NotLoggedWelcome;
