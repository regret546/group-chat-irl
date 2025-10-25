import Button from "../components/UI/Button";

const Home = () => {
  return (
    <div>
      <div className="flex flex-col-reverse md:flex-row bg-primary p-[2rem] pb-0 relative">
        {/* LEFT CONTENT */}
        <div className="w-full md:w-1/2 flex items-center pb-[2rem]">
          <div className="w-full md:w-[85%]">
            <h2 className="text-[2rem]">Welcome to</h2>
            <h1 className="text-[3.5rem] text-white">Group Chat IRL Podcast</h1>
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
