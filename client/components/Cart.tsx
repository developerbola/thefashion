import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Cart = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <div className="font-semibold text-xl md:text-2xl cursor-pointer">
          CART{" [0]"}
        </div>
      </SheetTrigger>
      <SheetContent className="!max-w-[500px] !w-[500px]">
        <SheetHeader>
          <SheetTitle className="text-3xl">Your Cart</SheetTitle>
        </SheetHeader>
        <div className="flex items-center justify-center h-full w-full">
          <p>No items found</p>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
