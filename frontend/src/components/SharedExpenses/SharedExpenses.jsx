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
  window.addEventListener("resize", function () {
    const myDiv = document.getElementById("myShared");
    const myDiv2 = document.getElementById("sharedMe");
    const windowWidth = this.window.innerWidth;
    // if (windowWidth < 1000) {
    //   myDiv.classList.remove("max-height");
    //   myDiv2.classList.remove("max-height");
    // } else {
    //   myDiv.classList.add("max-height");
    //   myDiv2.classList.add("max-height");
    // }
  });
  useEffect(() => {}, []);
  return (
    <Container className="custom-container">
      <div className="d-flex flex-column flex-sm-column flex-md-column flex-lg-row justify-content-between ">
        <div className="col-12 col-sm-12 col-md-12 col-lg-6 container ">
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
          <motion.div id="myShared" className="rounded rounded-2 max-height" initial={{ y: -50, opacity: 0 }} animate={{ y: 20, opacity: 1 }} transition={{ duration: 1, ease: [0.6, -0.05, 0.01, 0.99] }}>
            <UsersProvider>
              <MineShared />
            </UsersProvider>
          </motion.div>
        </div>
        <div className="col-12 col-sm-12 col-md-12 col-lg-6 container ">
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
          <motion.div id="sharedMe" className="px-3 rounded rounded-2 max-height" initial={{ y: -50, opacity: 0 }} animate={{ y: 20, opacity: 1 }} transition={{ duration: 1, ease: [0.6, -0.05, 0.01, 0.99] }}>
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
