import { motion } from "framer-motion";
import React from "react";

const { jwtDecode } = require("jwt-decode");
const Home = () => {
  const userData = localStorage.getItem("authorized_user");
  let decoded = jwtDecode(userData);

  return (
    <>
      <motion.div className="container" initial={{ y: -50, opacity: 0 }} animate={{ y: 20, opacity: 1 }} transition={{ duration: 1, ease: [0.6, -0.05, 0.01, 0.99] }}>
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
      </motion.div>
    </>
  );
};

export default Home;
