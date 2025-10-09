import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { cartAtom } from "@/lib/atoms";
import { useAtom } from "jotai";
import { Input } from "./ui/input";
import {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
} from "@/components/ui/button-group";
import { MinusIcon, PlusIcon } from "lucide-react";

const Cart = () => {
  const [cart, setCart] = useAtom(cartAtom);

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const handleRemove = (id: string) => {
    setCart((prevCart) =>
      prevCart.filter((cartItem: ProductType) => cartItem.$id !== id)
    );
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="font-semibold text-xl md:text-2xl flex items-center gap-2 cursor-pointer">
          Cart [{cart.length}]
        </button>
      </SheetTrigger>
      <SheetContent className="!max-w-[500px] w-full sm:w-[500px] flex flex-col">
        <SheetHeader className="border-b border-neutral-300">
          <SheetTitle className="text-2xl font-bold flex items-center gap-2">
            Your Cart
          </SheetTitle>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
              <p className="text-lg">Your cart is empty</p>
              <p className="text-sm">Add some great items to enjoy!</p>
            </div>
          ) : (
            <div className="space-y-1">
              {cart.map((item: ProductType) => (
                <div
                  key={item.$id}
                  className="flex items-center justify-between p-4"
                >
                  <div className="flex items-center space-x-4 flex-1">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-sm"
                    />
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-xl truncate">
                        {item.name}
                      </h3>
                      <p className="text-xs text-muted-foreground mb-1">
                        {item.brand}
                      </p>
                      <p className="text-sm font-medium text-primary">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <div className="h-[60px] flex flex-col justify-between items-end">
                    <ButtonGroup
                      aria-label="Media controls"
                      className="h-fit items-center"
                    >
                      <Button variant="ghost" className="size-6 rounded-none text-neutral-400 hover:text-neutral-400 hover:bg-neutral-100/50">
                        <PlusIcon />
                      </Button>
                      <Button variant="ghost" size="sm" disabled className="text-black text-xl">
                        1
                      </Button>
                      <Button variant="ghost" className="size-6 rounded-none text-neutral-400 hover:text-neutral-400 hover:bg-neutral-100/50">
                        <MinusIcon />
                      </Button>
                    </ButtonGroup>
                    <button
                      onClick={() => handleRemove(item.$id)}
                      className="text-red-500 underline underline-offset-4 decoration-1 cursor-pointer text-[13px] align-right"
                    >
                      remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        {cart.length > 0 && (
          <SheetFooter className="pt-4 border-t bg-background/50">
            <div className="w-full space-y-2">
              <div className="flex justify-between text-lg font-semibold">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <Button className="w-full" size="lg">
                Continue to Checkout
              </Button>
            </div>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
