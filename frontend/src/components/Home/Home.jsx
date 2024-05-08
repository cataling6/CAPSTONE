import { motion } from "framer-motion";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faShareNodes } from "@fortawesome/free-solid-svg-icons";
import { Container } from "react-bootstrap";

const { jwtDecode } = require("jwt-decode");
const Home = () => {
  const userData = localStorage.getItem("authorized_user");
  let decoded = jwtDecode(userData);

  return (
    <>
      <Container>
        <motion.h5
          initial={{ y: -40 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            type: "spring",
            damping: 10, // Damping controlla l'ammortizzazione dell'effetto, minore è il valore, maggiore è l'effetto di rimbalzo
            stiffness: 400, // Stiffness controlla la rigidità dell'effetto, maggiore è il valore, più rapida è l'animazione
            duration: 1, // Durata dell'animazione in secondi
          }}
        >
          Steps for use of the app:
        </motion.h5>
        <motion.div className="container max-height" initial={{ y: -50, opacity: 0 }} animate={{ y: 20, opacity: 1 }} transition={{ duration: 1, ease: [0.6, -0.05, 0.01, 0.99] }}>
          <div>
            <ol>
              <li>Select "Configurations" and start to add some categories</li>
              <li>Select "Expenses" and add your data!</li>
              <li>In "Expense" section you will find 2 icons for each expense:</li>
              <ul>
                <li>
                  Share <FontAwesomeIcon icon={faShareNodes} />
                </li>
                <li>
                  Delete <FontAwesomeIcon icon={faTrashCan} />
                </li>
                <li>By clicking "share" you will be able to share the expense with an another user by completing with the mail (user shoud be registered to "MyFinance")</li>
                <li>By clicking "delete" you will delete the expense</li>
              </ul>
              <li>Select "Statistics" for have more detailed info about the expenses</li>
              <ul>
                <li>Here you will have 2 Charts:</li>
                <li>the left one will expose "today", "last 7 days" and "last 30 days" expenses by category; on mouse over you will see category and the amount</li>
                <li>the right one is showing the total expenses by month in the last year</li>
              </ul>
              <li>Select "Shared expenses" and you will have a panomaric view about shared expenses;</li>
              <ul>Left side: your shared expenses with the ability of deleting the shared one;</ul>
              <ul>Right side: expenses shared with you; here you can see the amount, category owner user, date and notes</ul>
              <li>Select profile in the top right corner: here you can select "profile" then can change your profile picture.</li>
            </ol>
          </div>
        </motion.div>
      </Container>
    </>
  );
};

export default Home;
