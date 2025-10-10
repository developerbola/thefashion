import React from "react";
import { Check } from "lucide-react";

const Success = () => {
  return (
    <div className="min-h-screen pt-36">
      <div className="max-w-2xl mx-auto">
        <div className="overflow-hidden border border-white/30">
          {/* Success Icon */}
          <div className="text-center">
            <div className="mx-auto w-24 h-24 rounded-full flex items-center justify-center shadow-lg bg-emerald-500">
              <Check size={45} color="white" />
            </div>
            <h1 className="mt-6 text-4xl font-bold">
              Payment Successful!
            </h1>
            <p className="mt-2 text-neutral-600 text-lg">
              Your order has been confirmed and is on its way.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Success;
