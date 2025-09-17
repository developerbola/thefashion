"use client";
import Link from "next/link";
import Cart from "./Cart";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();

  if (pathname.includes("/dashboard")) {
    return null;
  }
  
  return (
    <div className="fixed bg-white h-16 w-full px-8 flex items-center justify-between z-10">
      <Link href={"/shop"} className="font-semibold text-xl md:text-2xl">
        SHOP ALL
      </Link>
      <Link href={"/"}>
        <div className="bg-white p-4">
          <img src="/logo.svg" alt="tf. logo" className="size-[30px]" />
        </div>
      </Link>
      <Cart />
    </div>
  );
};

export default Navbar;
