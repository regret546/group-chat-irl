import "./style.css";
import Navbar from "./components/Navbar";
import Home from "./sections/Home";
import Latest from "./sections/Latest";
import Previous from "./sections/Previous";

function App() {
  return (
    <>
      <div className="h-screen w-full ">
        <Navbar />
        <Home />
        <Latest />
        <Previous />
      </div>
    </>
  );
}

export default App;
