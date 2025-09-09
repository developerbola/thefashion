import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="h-16 w-full px-8 flex items-center justify-between">
      <Link href={"/shop"} className="font-semibold text-2xl">
        SHOP ALL
      </Link>
      <Link href={"/shop"}>
        <Image src={"/logo.svg"} alt="tf. logo" width={30} height={30} />
      </Link>
      <div className="font-semibold text-2xl">CART{" [0]"}</div>
    </div>
  );
};

export default Navbar;
