const Hero = () => {
  return (
    <div className="flex h-[calc(100vh-64px)] relative">
      <div className="relative w-1/2 overflow-clip">
        <img
          src="/hero1.jpg"
          alt="Sweatshirt"
          className="object-cover object-center scale-110"
        />
      </div>
      <p className="absolute transform -translate-[50%] top-1/2 left-1/2 z-2 text-[200px] font-medium text-white">
        CLASSICS
      </p>
      <div className="relative w-1/2 overflow-clip">
        <img
          src="/hero2.png"
          alt="Tote"
          className="object-cover object-center scale-110"
        />
      </div>
    </div>
  );
};

export default Hero;
