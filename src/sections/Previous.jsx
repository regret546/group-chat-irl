import React from "react";

const Previous = () => {
  return (
    <section className="previous bg-primary grid justify-items-center p-4 pb-[3rem]">
      <div className="grid justify-items-center w-[80%]">
        <h2 className="font-bold text-accent text-3xl">
          Start Listineing Today
        </h2>
        <h3 className="text-dark font-medium text-4xl mt-[2rem]">
          Previous Episodes
        </h3>
        <div className="flex gap-4 w-[400px] justify-center w-full  mt-[2rem]">
          {/*  Cards */}
          <div className="basos-1/3 bg-dark p-[2rem] grid gap-4 justify-items-center">
            <img className="w-full" src="/src/assets/thumbnail.jpg" alt="" />
            <div className="flex justify-between w-full text-primary text-[0.9rem]">
              <div className="flex items-center gap-2">
                <i class="fa-solid fa-calendar-days"></i>
                <p>Spetember 20, 2025</p>
              </div>
              <div className="flex items-center gap-2">
                <i class="fa-solid fa-clock"></i>
                <p>43:03</p>
              </div>
            </div>
            <h3 className="text-[1.5rem] font-bold text-white">
              EPISODE 7: FLOOD CONTROL ISSUE AS A TAX PAYERS
            </h3>
            <i class="text-[2rem] text-primary hover:text-primary/80 hover:scale-125 transition-all cursor-pointer mr-auto fa-solid fa-circle-play "></i>
          </div>

          <div className="basos-1/3 bg-dark p-[2rem] grid gap-4 justify-items-center">
            <img className="w-full" src="/src/assets/thumbnail.jpg" alt="" />
            <div className="flex justify-between w-full text-primary text-[0.9rem]">
              <div className="flex items-center gap-2">
                <i class="fa-solid fa-calendar-days"></i>
                <p>Spetember 20, 2025</p>
              </div>
              <div className="flex items-center gap-2">
                <i class="fa-solid fa-clock"></i>
                <p>43:03</p>
              </div>
            </div>
            <h3 className="text-[1.5rem] font-bold text-white">
              EPISODE 7: FLOOD CONTROL ISSUE AS A TAX PAYERS
            </h3>
            <i class="text-[2rem] text-primary hover:text-primary/80 hover:scale-125 transition-all cursor-pointer mr-auto fa-solid fa-circle-play "></i>
          </div>

          <div className="basos-1/3 bg-dark p-[2rem] grid gap-4 justify-items-center">
            <img className="w-full" src="/src/assets/thumbnail.jpg" alt="" />
            <div className="flex justify-between w-full text-primary text-[0.9rem]">
              <div className="flex items-center gap-2">
                <i class="fa-solid fa-calendar-days"></i>
                <p>Spetember 20, 2025</p>
              </div>
              <div className="flex items-center gap-2">
                <i class="fa-solid fa-clock"></i>
                <p>43:03</p>
              </div>
            </div>
            <h3 className="text-[1.5rem] font-bold text-white">
              EPISODE 7: FLOOD CONTROL ISSUE AS A TAX PAYERS
            </h3>
            <i class="text-[2rem] text-primary hover:text-primary/80 hover:scale-125 transition-all cursor-pointer mr-auto fa-solid fa-circle-play "></i>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Previous;
