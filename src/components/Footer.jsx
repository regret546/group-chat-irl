import React from "react";
import { useNavigate } from "react-router-dom";
import logoBlack from "../assets/logo-black.png";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-primary text-dark grid place-items-center">
      <div className="flex flex-col md:flex-row justify-evenly items-center w-full md:w-[80%] gap-6 md:gap-0 py-6 md:py-8">
        <img
          className="w-[100px] md:w-[150px]"
          src={logoBlack}
          alt="logo"
          loading="lazy"
        />
        <div className="grid gap-2 text-center md:text-left">
          <h3 className="text-[1.1rem] md:text-[1.2rem] font-bold">
            Follow us
          </h3>
          <div className="flex gap-4 justify-center md:justify-start">
            <a
              href="https://www.youtube.com/@GroupChatIRLPodcast"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa-brands fa-youtube text-dark text-2xl cursor-pointer hover:text-accent transition"></i>
            </a>
            <a
              href="https://www.facebook.com/gcirlpodcast"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa-brands fa-facebook text-dark text-2xl cursor-pointer hover:text-accent transition"></i>
            </a>
          </div>
        </div>
        <div className="text-center md:text-left">
          <h3 className="text-[1.1rem] md:text-[1.2rem] font-bold">Pages</h3>
          <ul className="text-base md:text-1xl font-medium">
            <li
              className="cursor-pointer hover:text-accent transition"
              onClick={() => navigate("/reviews")}
            >
              Reviews
            </li>
            <li
              className="cursor-pointer hover:text-accent transition"
              onClick={() => navigate("/episodes")}
            >
              Episodes
            </li>
          </ul>
        </div>
      </div>
      <p className="bg-dark w-full grid place-items-center text-white py-4 text-sm md:text-base text-center px-4">
        GroupChat IRL Podcast &copy; 2025. All Rights Reserved.
      </p>
    </div>
  );
};

export default Footer;
