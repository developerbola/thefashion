const Showcase = () => {
  return (
    <div className="relative h-[50vw] md:h-[calc(100vh-64px)] w-full flex justify-end bg-[#156ef7] overflow-clip">
      <div className="absolute left-[3%] top-[5%] z-2">
        <p
          className="uppercase font-medium whitespace-nowrap text-white"
          style={{
            fontSize: "clamp(2.5rem, 10vw, 12.5rem)",
            lineHeight: 0.9,
          }}
        >
          Build <br /> in style
        </p>
      </div>
      <img
        src="/showcase.webp"
        alt="showcase image"
        className="h-full w-auto scale-150 md:scale-200 mt-[80px] md:mt-[400px] md:mr-[180px]"
      />
    </div>
  );
};

export default Showcase;
