import React from "react";

const Previous = () => {
  return (
    <section className="previous bg-primary grid justify-items-center p-4 pb-[3rem]">
      <div className="grid justify-items-center w-full md:w-[80%]">
        <h2 className="font-bold text-accent text-2xl md:text-3xl text-center">
          Start Listening Today
        </h2>
        <h3 className="text-dark font-medium text-3xl md:text-4xl mt-[1rem] md:mt-[2rem] text-center">
          Previous Episodes
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full mt-[2rem]">
          {/*  Cards */}
          <div className="bg-dark p-[1.5rem] md:p-[2rem] grid gap-4 justify-items-center">
            <img className="w-full" src="/src/assets/thumbnail.jpg" alt="" />
            <div className="flex justify-between w-full text-primary text-[0.8rem] md:text-[0.9rem]">
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-calendar-days"></i>
                <p>September 20, 2025</p>
              </div>
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-clock"></i>
                <p>43:03</p>
              </div>
            </div>
            <h3 className="text-[1.2rem] md:text-[1.5rem] font-bold text-white">
              EPISODE 7: FLOOD CONTROL ISSUE AS A TAX PAYERS
            </h3>
            <i className="text-[2rem] text-primary hover:text-primary/80 hover:scale-125 transition-all cursor-pointer mr-auto fa-solid fa-circle-play"></i>
          </div>

          <div className="bg-dark p-[1.5rem] md:p-[2rem] grid gap-4 justify-items-center">
            <img className="w-full" src="/src/assets/thumbnail.jpg" alt="" />
            <div className="flex justify-between w-full text-primary text-[0.8rem] md:text-[0.9rem]">
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-calendar-days"></i>
                <p>September 20, 2025</p>
              </div>
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-clock"></i>
                <p>43:03</p>
              </div>
            </div>
            <h3 className="text-[1.2rem] md:text-[1.5rem] font-bold text-white">
              EPISODE 7: FLOOD CONTROL ISSUE AS A TAX PAYERS
            </h3>
            <i className="text-[2rem] text-primary hover:text-primary/80 hover:scale-125 transition-all cursor-pointer mr-auto fa-solid fa-circle-play"></i>
          </div>

          <div className="bg-dark p-[1.5rem] md:p-[2rem] grid gap-4 justify-items-center">
            <img className="w-full" src="/src/assets/thumbnail.jpg" alt="" />
            <div className="flex justify-between w-full text-primary text-[0.8rem] md:text-[0.9rem]">
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-calendar-days"></i>
                <p>September 20, 2025</p>
              </div>
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-clock"></i>
                <p>43:03</p>
              </div>
            </div>
            <h3 className="text-[1.2rem] md:text-[1.5rem] font-bold text-white">
              EPISODE 7: FLOOD CONTROL ISSUE AS A TAX PAYERS
            </h3>
            <i className="text-[2rem] text-primary hover:text-primary/80 hover:scale-125 transition-all cursor-pointer mr-auto fa-solid fa-circle-play"></i>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Previous;
