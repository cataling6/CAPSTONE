
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import './App.css';
import { Route, Routes, useLocation } from "react-router-dom"
import { AnimatePresence } from 'framer-motion'
import NotLoggedWelcome from "./components/NotLoggedWelcome/NotLoggedWelcome";
import Mainlayout from "./layout/MainLayout";
import ProtectRoutes from "./middleware/ProtectRoutes";
import NotFound from "./components/NotFound/NotFound";
import Home from "./components/Home/Home";
import Expenses from "./components/Expenses/Expenses";
import Welcome from "./components/Welcome/Welcome";
import Configurations from "./components/Configurations/Configurations";
import Statistics from "./components/Statistics/Statistics";
import SharedExpenses from "./components/SharedExpenses/SharedExpenses";



function App() {
  const location = useLocation();
  return (

    <Mainlayout>
      <AnimatePresence>
        <Routes location={location} key={location.pathname}>
          <Route exact path="/" element={<NotLoggedWelcome />} />
          <Route element={<ProtectRoutes />}>
            <Route path="/home" element={<Home />} />
            <Route path="/welcome" element={<Welcome />} />
            <Route path="/statistics" element={<Statistics />} />
            <Route path="/expenses" element={<Expenses />} />
            <Route path="/expenses/configurations" element={<Configurations />} />
            <Route path="/sharedExpense" element={<SharedExpenses />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </AnimatePresence>
    </Mainlayout>

  );
}

export default App;
