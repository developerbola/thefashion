const ProductCard = ({ item }: { item: ProductType }) => {
  return (
    <div className="relative p-4 grid place-items-center bg-[#fafafa] cursor-pointer group">
      <div className="absolute p-4 flex flex-col justify-between h-full group-hover:h-[130%] transition-all duration-400 w-full z-[2]">
        <div className="flex justify-between [&>*]:text-base [&>*]:md:text-xl [&>*]:font-medium">
          <p>CLASSICS</p>
          <p>
            $
            {Number(String(item.price).replace(".", "")).toLocaleString(
              "en-US"
            )}
          </p>
        </div>
        <div className="w-full">
          <p className="text-lg md:text-2xl font-semibold">{item.name}</p>
        </div>
      </div>
      <img
        src={item.imageUrl}
        alt={item.name}
        className="w-auto h-[85%] group-hover:scale-[105%] transition-all duration-400"
      />
    </div>
  );
};

export default ProductCard;
