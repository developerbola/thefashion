import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className="grid place-items-center w-full h-screen">
      <div className="flex items-center gap-2 text-3xl">
        There is no page{" "}
        <Link href={"/"}>
          <Button variant={"outline"} size={"icon"}>
            <Home />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
