import WetPaintButton from "./UI/WetButton";
import Button from "./UI/Button";

const Navbar = () => {
  return (
    <nav className="flex w-full justify-between items-center py-[1.5rem] px-[3rem] bg-dark text-white">
      <div>Logo</div>
      <div className="flex gap-8 items-center">
        {" "}
        <ul className="flex gap-[2rem] text-[1.2rem]">
          <li className="cursor-pointer">Home</li>
          <li className="cursor-pointer">Episodes</li>
          <li className="cursor-pointer">Reviews</li>
        </ul>
        <Button text="Subscribe" />
      </div>
    </nav>
  );
};

export default Navbar;
