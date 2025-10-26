import WetPaintButton from "./UI/WetButton";
import Button from "./UI/Button";
import { div } from "motion/react-client";

const Navbar = () => {
  return (
    <div className="w-full grid place-items-center bg-dark">
      <nav className="flex justify-between items-center w-[80%] px-[2rem] py-[1.5rem]   text-white ">
        <img
          className="w-[80px] h-[80px]"
          src="/src/assets/logo-white.png"
          alt="logo"
        />
        <div className="flex gap-8 items-center">
          <ul className="flex gap-[2rem] text-[1.2rem]">
            {["Home", "Episodes", "Reviews"].map((item) => (
              <li
                key={item}
                className="relative cursor-pointer font-semibold text-white 
                         after:content-[''] after:absolute after:left-0 after:bottom-[-4px]
                         after:w-0 after:h-[2px] after:bg-[#FCAB1C]
                         after:transition-all after:duration-300
                         hover:text-[#FCAB1C] hover:after:w-full"
              >
                {item}
              </li>
            ))}
          </ul>
          <Button
            text="Subscribe"
            className="bg-primary text-dark hover:bg-primary/80 transition-none"
          />
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
