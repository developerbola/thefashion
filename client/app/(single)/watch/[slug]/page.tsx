"use client";

import { api } from "@/lib/api";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type ProductType = {
  $id: string;
  name: string;
  price: number;
  imageUrl: string;
  brand: string;
  description: string;
  slug: string;
  type: "watch" | "outfit";
  collection?: string;
  size?: string;
  material?: string;
};

interface Type extends Omit<ProductType, "imageUrl"> {
  imageUrl: undefined | string;
}

const Watch = () => {
  const [product, setProduct] = useState<Type | null>(null);
  const { slug } = useParams();

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await api("get", `/watches/${slug}`);
        setProduct(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetch();
  }, [slug]);

  const isLoading = !product;

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-4 md:p-10">
      <div className="max-w-6xl w-full bg-white grid md:grid-cols-2 overflow-hidden">
        <div className="bg-[#f3f3f3] flex items-center justify-center p-10">
          {isLoading ? (
            <Skeleton className="w-full h-[400px] md:h-[600px] rounded-lg" />
          ) : (
            <img
              src={product.imageUrl || "/placeholder.png"}
              alt={product.name}
              className="object-contain w-full h-[400px] md:h-[600px]"
            />
          )}
        </div>

        <div className="flex flex-col justify-center px-6 md:px-12 py-10 gap-6">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 leading-tight">
              {isLoading ? (
                <Skeleton className="h-10 w-40 rounded-sm" />
              ) : (
                product?.name
              )}
            </h1>
            <div className="text-gray-600 mt-2">
              {isLoading ? (
                <Skeleton className="h-7 w-[400px] rounded-sm" />
              ) : (
                product?.description
              )}
            </div>
          </div>

          <div className="text-2xl font-semibold text-gray-900 mt-3 flex">
            $
            {isLoading ? (
              <Skeleton className="h-7 w-20 rounded-sm" />
            ) : (
              product?.price
            )}
          </div>

          <div>
            <p className="text-sm font-semibold text-gray-500 tracking-wide mb-1">
              QUANTITY
            </p>
            <Input
              type="number"
              min="1"
              defaultValue="1"
              className="w-20 rounded-sm"
              disabled={isLoading}
            />
          </div>

          <div className="mt-4 divide-y text-sm text-gray-700">
            <div className="flex justify-between py-2">
              <span>COLLECTION</span>
              <span className="font-medium text-gray-900 uppercase">
                {isLoading ? (
                  <Skeleton className="h-full w-14 rounded-sm" />
                ) : (
                  product?.type
                )}
              </span>
            </div>
            <div className="flex justify-between py-2">
              <span>BRAND</span>
              <span className="font-medium text-gray-900">
                {isLoading ? (
                  <Skeleton className="h-full w-12 rounded-sm" />
                ) : (
                  product?.brand
                )}
              </span>
            </div>
            <div className="flex justify-between py-2">
              <span>SIZE</span>
              <span className="font-medium text-gray-900">
                {isLoading ? (
                  <Skeleton className="h-full w-20 rounded-sm" />
                ) : (
                  product?.size || "STANDART"
                )}
              </span>
            </div>
            <div className="flex justify-between py-2">
              <span>MATERIAL</span>
              <span className="font-medium text-gray-900">
                {isLoading ? (
                  <Skeleton className="h-full w-18 rounded-sm" />
                ) : (
                  product?.material || "METALL"
                )}
              </span>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-3 mt-6">
            <Button
              className="w-full h-12 bg-black hover:bg-gray-800 text-white rounded-md text-sm font-semibold tracking-wide"
              disabled={isLoading}
            >
              BUY NOW
            </Button>
            <Button
              className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-semibold tracking-wide"
              disabled={isLoading}
            >
              ADD TO CART
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Watch;
