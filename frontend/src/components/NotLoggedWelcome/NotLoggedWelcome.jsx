import React from "react";
import { Container } from "react-bootstrap";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import img1 from "../../assets/imgs/carrouselle_img/ai-generated-8130376_1280.jpg";
import img2 from "../../assets/imgs/carrouselle_img/calculator-385506_1280.jpg";
import img3 from "../../assets/imgs/carrouselle_img/money-8692175_1280.jpg";
import "./style.css";
const NotLoggedWelcome = () => {
  return (
    <>
      <motion.main className="main__container" initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, ease: [0.6, -0.05, 0.01, 0.99] }}>
        <Container>
          <motion.h1 className="text-white text-center" initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1.0, ease: [0.9, -0.05, 0.01, 0.99] }}>
            Welcome to MyFinance!
          </motion.h1>
          <motion.div>
            <div className="d-flex justify-content-end">
              <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 30, opacity: 1 }} transition={{ duration: 1.2, ease: [0.9, -0.05, 0.01, 0.99] }}>
                <label>"Get ready to supercharge your savings journey with me! 🌟 Whether it's budgeting tips, savvy shopping strategies, or financial hacks, I've got you covered. Let's unlock the secrets to saving smarter together!"</label>
              </motion.div>
              <motion.div
                className="my-box"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.2,
                  ease: [0, 0.71, 0.2, 1.01],
                  scale: {
                    type: "spring",
                    damping: 3,
                    stiffness: 100,
                    restDelta: 0.001,
                  },
                }}
              >
                <img src={img1} />
                <span className="text-white my-text fs-3">Unlock Savings with Me! </span>
              </motion.div>
            </div>
            <div className="d-flex flex-row-reverse ">
              <motion.div className="ps-5" initial={{ y: -20, opacity: 0 }} animate={{ y: 30, opacity: 1 }} transition={{ duration: 1.2, ease: [0.9, -0.05, 0.01, 0.99] }}>
                <label>"Experience the power of financial freedom! 💸 I'll show you how to trim expenses and watch your savings soar. Let's turn your financial goals into reality, one dollar at a time!"</label>
              </motion.div>
              <motion.div
                className="my-box"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.2,
                  ease: [0, 0.8, 0.2, 1.01],
                  scale: {
                    type: "spring",
                    damping: 3,
                    stiffness: 70,
                    restDelta: 0.003,
                  },
                }}
              >
                <img src={img2} />
                <span className="text-white my-text fs-3">Cut Costs, Grow Savings!</span>
              </motion.div>
            </div>
            <div className="d-flex justify-content-end">
              <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 30, opacity: 1 }} transition={{ duration: 1.2, ease: [0.9, -0.05, 0.01, 0.99] }}>
                <label>"Join me to unlock unbeatable savings! 💰 With savvy tips and tricks, I'll help you keep more money in your pocket effortlessly. Let's make saving simple and rewarding!"</label>
              </motion.div>
              <motion.div
                className="my-box"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.2,
                  ease: [0, 0.71, 0.2, 1.01],
                  scale: {
                    type: "spring",
                    damping: 3,
                    stiffness: 120,
                    restDelta: 0.002,
                  },
                }}
              >
                <img src={img3} />
                <span className="text-white my-text fs-3">"Save Big with Me!" </span>
              </motion.div>
            </div>
          </motion.div>
          <div className="d-flex justify-content-center mt-5">
            <Link as={Link} to="/login" className="btn btn-primary">
              Try It Now!
            </Link>
          </div>
        </Container>
      </motion.main>
    </>
  );
};

export default NotLoggedWelcome;
