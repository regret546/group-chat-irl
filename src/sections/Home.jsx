import { div } from "motion/react-client";
import Button from "../components/UI/Button";

const Home = () => {
  return (
    <div className="bg-primary grid place-items-center ">
      <div className="flex-row md:flex justify-center p-[2rem] pb-0 relative w-[80%]">
        {/* LEFT CONTENT */}
        <div className="w-full md:w-1/2 flex  pb-[2rem]">
          <div className="w-full md:w-[85%]">
            <img src="/src/assets/irl-card.png" alt="card" />
            <p className="text-[1.25rem]">
              Weekly Bardagulan with Vivax and Friends. Lorem Ipsum is simply
              dummy text of the printing and typesetting industry. Lorem Ipsum
              has been the industry's standard dummy text ever since the 1500s,
              when an unknown printer took a galley of type and scrambled it to
              make a type specimen book. It has survived not only five
              centuries, but also the leap into electronic typesetting,
              remaining essentially unchanged. It was popularised in the 1960s
              with the release of Letraset sheets containing.
            </p>
            <Button
              text="All Episodes"
              className="bg-accent hover:bg-accent/80 mt-[1rem] px-[3rem] transition-none"
            />
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-end">
          <img
            className="w-full h-auto max-w-[600px] md:max-w-[900px] object-contain"
            src="/src/assets/group-photo.png"
            alt="Group photo"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
