import "./style.css";
import Navbar from "./components/Navbar";
import Home from "./sections/Home";
import Latest from "./sections/Latest";

function App() {
  return (
    <>
      <div className="h-screen w-full ">
        <Navbar />
        <Home />
        <Latest />
      </div>
    </>
  );
}

export default App;
