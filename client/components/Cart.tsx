import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cartAtom } from "@/lib/atoms";
import { useAtom } from "jotai";

const Cart = () => {
  const [cart, setCart] = useAtom(cartAtom);

  return (
    <Sheet>
      <SheetTrigger>
        <div className="font-semibold text-xl md:text-2xl cursor-pointer">
          CART{` [${cart.length}]`}
        </div>
      </SheetTrigger>
      <SheetContent className="!max-w-[500px] !w-[500px]">
        <SheetHeader>
          <SheetTitle className="text-3xl">Your Cart</SheetTitle>
        </SheetHeader>
        <div className="flex items-center justify-center h-full w-full">
          {cart.length === 0 ? (
            <div className="text-center text-lg">Your cart is empty</div>
          ) : (
            <div className="w-full">
              {cart.map((item: ProductType, index: number) => (
                <div
                  key={index}
                  className="flex items-center justify-between border-b py-4"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div>
                      <div className="font-semibold">{item.name}</div>
                      <div className="text-sm text-gray-500">
                        ${item.price.toFixed(2)}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() =>
                      setCart((prevCart) =>
                        prevCart.filter(
                          (cartItem: any) => cartItem.$id !== item.$id
                        )
                      )
                    }
                    className="text-red-500 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
