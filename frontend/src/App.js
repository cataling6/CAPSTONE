
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import './App.css';
import { Route, Routes, useLocation } from "react-router-dom"
import { AnimatePresence } from 'framer-motion'
import NotLoggedWelcome from "./components/NotLoggedWelcome/NotLoggedWelcome";
import Welcome from "./components/Welcome/Welcome";
import Mainlayout from "./layout/MainLayout";
import ProtectRoutes from "./middleware/ProtectRoutes";
import NotFound from "./components/NotFound/NotFound";



function App() {
  const location = useLocation();
  return (

    <Mainlayout>
      <AnimatePresence>
        <Routes location={location} key={location.pathname}>
          <Route exact path="/" element={<NotLoggedWelcome />} />
          <Route element={<ProtectRoutes />}>
            <Route exact path="/home" element={<Welcome />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </AnimatePresence>
    </Mainlayout>

  );
}

export default App;
