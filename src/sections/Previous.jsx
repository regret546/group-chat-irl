import React from "react";

const Previous = () => {
  return (
    <section className="bg-primary grid justify-items-center  p-4">
      <div className="grid justify-items-center w-[80%]">
        <h2 className="font-bold text-accent text-3xl">
          Start Listineing Today
        </h2>
        <h3 className="text-dark font-medium text-4xl mt-[2rem]">
          Previous Episodes
        </h3>
        <div className="flex flex-wrap gap-4 w-full justify-start mt-[2rem]">
          <div className="bg-dark p-4">
            <img className="w-[200px]" src="/src/assets/thumbnail.jpg" alt="" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Previous;
