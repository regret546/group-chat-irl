import "./style.css";
import Navbar from "./components/Navbar";
import Home from "./sections/Home";
import Latest from "./sections/Latest";
import Previous from "./sections/Previous";
import Reviews from "./sections/Reviews";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <div className="h-screen w-full overflow-x-hidden">
        <Navbar />
        <Home />
        <Latest />
        <Previous />
        <Reviews />
        <Footer />
      </div>
    </>
  );
}

export default App;
