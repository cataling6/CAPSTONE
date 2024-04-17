import React from "react";
import { useState } from "react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import { motion } from "framer-motion";

const Login = () => {
  const [showSignupForm, setShowSignupForm] = useState(false);
  const toggleForm = () => setShowSignupForm(!showSignupForm);

  return (
    <>
      <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 250, opacity: 1 }} transition={{ duration: 1, ease: [0.6, -0.05, 0.01, 0.99] }}>
        {showSignupForm ? <SignupForm toggleForm={toggleForm} /> : <LoginForm toggleForm={toggleForm} />}
      </motion.div>
    </>
  );
};

export default Login;
