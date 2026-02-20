"use client";

const Hero = () => {
  return (
    <>
      <div className="grid grid-flow-col grid-rows-3 gap-4">
        <div className="row-span-2 row-start-2 ...">01</div>
        <div className="row-span-2 row-end-3 ...">02</div>
        <div className="row-start-1 row-end-4 ...">03</div>
      </div>
    </>
  );
};

export default Hero;
