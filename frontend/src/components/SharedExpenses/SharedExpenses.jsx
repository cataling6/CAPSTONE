import React, { useContext, useEffect, useId } from "react";
import { Container } from "react-bootstrap";
import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2";
import MineShared from "./MineShared";
import UsersProvider from "../../contexts/users_ctx";
import SharedWithMe from "./SharedWithMe";
import "./style.css";
import { motion } from "framer-motion";
const SharedExpenses = () => {
  const session = localStorage.getItem("authorized_user");
  const decodedSession = jwtDecode(session);

  useEffect(() => {}, []);
  return (
    <Container>
      <div className="d-flex justify-content-between ">
        <div className="w-50 container ">
          <motion.div
            className="d-flex justify-content-center"
            initial={{ y: -40 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              type: "spring",
              damping: 10, // Damping controlla l'ammortizzazione dell'effetto, minore è il valore, maggiore è l'effetto di rimbalzo
              stiffness: 400, // Stiffness controlla la rigidità dell'effetto, maggiore è il valore, più rapida è l'animazione
              duration: 1, // Durata dell'animazione in secondi
            }}
          >
            My Shared Expenses
          </motion.div>
          <motion.div className=" rounded rounded-2 max-height" initial={{ y: -50, opacity: 0 }} animate={{ y: 20, opacity: 1 }} transition={{ duration: 1, ease: [0.6, -0.05, 0.01, 0.99] }}>
            <UsersProvider>
              <MineShared />
            </UsersProvider>
          </motion.div>
        </div>
        <div className="w-50 container ">
          <motion.div
            className="d-flex justify-content-center"
            initial={{ y: -40 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              type: "spring",
              damping: 10, // Damping controlla l'ammortizzazione dell'effetto, minore è il valore, maggiore è l'effetto di rimbalzo
              stiffness: 400, // Stiffness controlla la rigidità dell'effetto, maggiore è il valore, più rapida è l'animazione
              duration: 1, // Durata dell'animazione in secondi
            }}
          >
            Shared with me
          </motion.div>
          <motion.div className=" rounded rounded-2 max-height" initial={{ y: -50, opacity: 0 }} animate={{ y: 20, opacity: 1 }} transition={{ duration: 1, ease: [0.6, -0.05, 0.01, 0.99] }}>
            <div className="row d-flex mt-3 px-3 gap-2 justify-content-center ">
              <UsersProvider>
                <SharedWithMe />
              </UsersProvider>
            </div>
          </motion.div>
        </div>
      </div>
    </Container>
  );
};

export default SharedExpenses;
