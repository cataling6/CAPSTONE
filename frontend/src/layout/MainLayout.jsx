import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";

const Mainlayout = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export default Mainlayout;
