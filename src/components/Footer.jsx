import React from "react";

const Footer = () => {
  return (
    <div className="bg-primary text-dark grid place-items-center">
      <div className="flex justify-evenly items-center w-[80%]">
        <img
          className="w-[150px]"
          src="/src/assets/logo-black.png"
          alt="logo"
        />
        <div className="grid gap-2">
          <h3 className="text-[1.2rem] font-bold">Follow us</h3>
          <div>
            <i class="fa-brands fa-youtube text-dark text-2xl cursor-pointer"></i>
            <i class="fa-brands fa-facebook text-dark text-2xl cursor-pointer"></i>
          </div>
        </div>
        <div>
          <h3 className="text-[1.2rem] font-bold">Pages</h3>
          <ul className="text-1xl font-medium">
            <li className="cursor-pointer">Home</li>
            <li className="cursor-pointer">Episodes</li>
          </ul>
        </div>
      </div>
      <p className="bg-dark w-full grid place-items-center text-white py-4">
        {" "}
        GroupChat IRL Podcast &copy; 2024. All Rights Reserved.
      </p>
    </div>
  );
};

export default Footer;
