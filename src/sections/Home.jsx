import { div } from "motion/react-client";
import Button from "../components/UI/Button";

const Home = () => {
  return (
    <section className="bg-primary grid place-items-center py-[1rem] md:py-[2rem]">
      <div className="flex-col md:flex-row md:flex justify-center p-[1rem] md:p-[2rem] pb-0 relative w-full md:w-[80%]">
        {/* LEFT CONTENT */}
        <div className="w-full md:w-1/2 flex pb-[2rem]">
          <div className="w-full md:w-[85%]">
            <img src="/src/assets/irl-card.png" alt="card" className="w-full" />
            <p className="text-[1rem] md:text-[1.25rem] mt-4">
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
              className="bg-accent hover:bg-accent/80 mt-[1rem] px-[2rem] md:px-[3rem] transition-none w-full md:w-auto"
            />
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-end">
          <img
            className="w-full h-auto max-w-full md:max-w-[900px] object-contain"
            src="/src/assets/group-photo.png"
            alt="Group photo"
          />
        </div>
      </div>
    </section>
  );
};

export default Home;
