const Hero = () => {
  return (
    <div className="flex flex-col md:flex-row h-fit md:h-[calc(100vh-64px)] relative">
      <div className="relative w-full md:w-1/2 h-64 md:h-auto overflow-clip">
        <img
          src="/hero1.jpg"
          alt="Sweatshirt"
          className="object-cover object-center scale-110 w-full h-full"
        />
      </div>
      <p className="absolute z-[2] text-[56px] md:text-[200px] font-medium text-white top-1/2 left-1/2 -translate-1/2 whitespace-nowrap pointer-events-none">
        CLASSICS
      </p>
      <div className="relative w-full md:w-1/2 h-64 md:h-auto overflow-clip">
        <img
          src="/hero2.png"
          alt="Tote"
          className="object-cover object-center scale-110 w-full h-full"
        />
      </div>
    </div>
  );
};

export default Hero;
