"use client";
import { cartAtom } from "@/lib/atoms";
import { formattedPrice } from "@/lib/utils";
import { useAtomValue } from "jotai";

const Checkout = () => {
  const cart = useAtomValue(cartAtom);

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.01;
  const total = subtotal + tax;

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="rounded-lg overflow-hidden">
          <div className="px-6 py-8">
            <h1 className="text-7xl font-[600] text-gray-900">Checkout</h1>
            <p className="mt-2 text-gray-600">
              Review your order and complete your purchase.
            </p>
          </div>

          {/* Cart Items */}
          <div className="px-6 py-8">
            {cart.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">Your cart is empty.</p>
              </div>
            ) : (
              <>
                <div className="space-y-6">
                  {cart.map((item) => (
                    <div
                      key={item.$id}
                      className="flex items-center space-x-6 border-b border-gray-200 pb-6 last:border-b-0"
                    >
                      <div className="relative w-24 h-24 flex-shrink-0">
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="object-cover rounded-lg"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {item.name}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                          {item.brand}
                        </p>
                        <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                          {item.description}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-semibold text-gray-900">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                        <p className="text-sm text-gray-500">
                          x{item.quantity}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <div className="space-y-4">
                    <div className="flex justify-between text-lg">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-semibold">
                        ${formattedPrice(subtotal)}
                      </span>
                    </div>
                    <div className="flex justify-between text-lg">
                      <span className="text-gray-600">Tax (10%)</span>
                      <span className="font-semibold">${tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-2xl font-bold border-t border-gray-200 pt-4">
                      <span className="text-gray-900">Total</span>
                      <span className="text-indigo-600">
                        ${formattedPrice(total)}
                      </span>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Checkout Button */}
          {cart.length > 0 && (
            <div className="px-6 py-8">
              <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200 text-lg">
                Proceed to Payment
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;
