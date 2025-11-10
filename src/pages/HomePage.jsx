import Navbar from "../components/Navbar";
import Home from "../sections/Home";
import Latest from "../sections/Latest";
import Previous from "../sections/Previous";
import Reviews from "../sections/Reviews";
import MessageUs from "../sections/MessageUs";
import Footer from "../components/Footer";

const HomePage = () => {
  return (
    <div className="w-full overflow-x-hidden min-h-screen">
      <Navbar />
      <Home />
      <Latest />
      <Previous />
      <Reviews />
      <MessageUs />
      <Footer />
    </div>
  );
};

export default HomePage;

