const Showcase = () => {
  return (
    <div className="relative h-[calc(100vh-64px)] w-full flex justify-end bg-[#d4d4d4]">
      <div className="absolute left-[5%] top-[5%]">
        <p
          className="uppercase text-[170px] font-medium whitespace-nowrap"
          style={{ lineHeight: 0.9 }}
        >
          Build <br /> in style
        </p>
      </div>
      <img
        src="/showcase.avif"
        alt="showcase image"
        className="h-full w-auto"
      />
    </div>
  );
};

export default Showcase;
