import WetPaintButton from "../components/UI/WetButton";

const Latest = () => {
  return (
    <div className="latest w-full grid justify-items-center h-[500px] bg-dark">
      <div className="p-4">
        {" "}
        <WetPaintButton text={"Latest Episodes"} />
      </div>
      <div className="flex gap-4">
        <img
          className="w-[500px] h-[300px]"
          src="/src/assets/thumbnail.jpg"
          alt="thumbnail"
        />
        <div className="">
          <h2 className="text-white text-3xl">
            EPISODE 8: Atty. Jelou Ann Feb Tabanao-Salon
          </h2>
          <div className="flex items-center gap-2 ">
            <i class=" fa-solid fa-rotate-left relative">
              <span className="absolute text-[0.6rem] left-[13px] top-[12px]">
                10
              </span>
            </i>
            <i class="text-[2.5rem] fa-solid fa-play"></i>
            <i class=" fa-solid fa-rotate-right relative">
              <span className="absolute text-[0.6rem] left-[13px] top-[12px]">
                30
              </span>
            </i>
            <p>00:04:24</p>
            <img className="w-[30%]" src="/src/assets/waveform.png" alt="" />
            <p>00:35:58</p>
            <i class="fa-solid fa-volume-high"></i>
            <i class="fa-solid fa-download"></i>
            <i class="fa-solid fa-share-nodes"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Latest;
