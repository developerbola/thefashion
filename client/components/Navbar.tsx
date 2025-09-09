import Image from "next/image";
import Link from "next/link";
import Cart from "./Cart";

const Navbar = () => {
  return (
    <div className="fixed bg-white h-16 w-full px-8 flex items-center justify-between z-10">
      <Link href={"/shop"} className="font-semibold text-2xl">
        SHOP ALL
      </Link>
      <Link href={"/"}>
        <div className="bg-white p-4">
          <Image src="/logo.svg" alt="tf. logo" width={30} height={30} />
        </div>
      </Link>
      <Cart />
    </div>
  );
};

export default Navbar;
