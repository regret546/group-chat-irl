import WetPaintButton from "./UI/WetButton";
import Button from "./UI/Button";

const Navbar = () => {
  return (
    <nav className="flex w-full justify-between items-center py-[1.5rem] px-[3rem] bg-dark text-white">
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
        <Button text="Subscribe" />
      </div>
    </nav>
  );
};

export default Navbar;
