import "./style.css";
import Navbar from "./components/Navbar";
import Home from "./sections/Home";

function App() {
  return (
    <>
      <div className=" h-screen w-full">
        <Navbar />
        <Home />
      </div>
    </>
  );
}

export default App;
