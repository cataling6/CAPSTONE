
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import './App.css';
import { Route, Routes, useLocation } from "react-router-dom"
import { AnimatePresence } from 'framer-motion'
import NotLoggedWelcome from "./components/NotLoggedWelcome/NotLoggedWelcome";
import Welcome from "./components/Welcome/Welcome";
import Mainlayout from "./layout/MainLayout";


function App() {
  const location = useLocation();
  return (

    <Mainlayout>
      <AnimatePresence>
        <Routes location={location} key={location.pathname}>
          <Route exact path="/" element={<NotLoggedWelcome />} />
          <Route exact path="/home" element={<Welcome />} />


        </Routes>
      </AnimatePresence>
    </Mainlayout>

  );
}

export default App;
