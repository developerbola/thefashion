"use client";

import { api } from "@/lib/api";
import useSWR from "swr";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import ProductCard from "@/components/ProductCard";
import { useState } from "react";

export type ProductType = {
  $id: number;
  name: string;
  price: number;
  imageUrl: string;
};

const fetcher = (url: string) => api("get", url);

export default function Outfits() {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();

  const {
    data: outfits,
    error,
    isLoading,
  } = useSWR<ProductType[]>("/outfits", fetcher, {
    dedupingInterval: 1000 * 60 * 5,
    revalidateOnFocus: false,
  });

  if (error) {
    return (
      <div className="p-[100px] w-full flex justify-center">
        <p className="self-center">An error accured during fetch outfits.</p>
      </div>
    );
  }

  return (
    <div className="pt-5 md:pt-18 pb-[100px]">
      <Carousel
        setApi={setCarouselApi}
        className="p-10"
        opts={{
          align: "start",
          slidesToScroll: 1,
        }}
      >
        <div className="flex items-center justify-between mb-4">
          <p className="text-2xl md:text-3xl lg:text-[40px] font-semibold">
            Outfits
          </p>

          <div className="flex items-center gap-3 md:gap-5">
            <Link
              href={"/shop/outfits"}
              className="text-lg md:text-2xl lg:text-3xl font-semibold whitespace-nowrap hover:text-blue-500"
            >
              View All
            </Link>
            <div className="flex items-center">
              <button
                className="cursor-pointer hover:text-blue-500"
                onClick={() => carouselApi?.scrollPrev()}
              >
                <ArrowLeft className="md:size-[35px]" />
              </button>
              <button
                className="cursor-pointer hover:text-blue-500"
                onClick={() => carouselApi?.scrollNext()}
              >
                <ArrowRight className="md:size-[35px]" />
              </button>
            </div>
          </div>
        </div>

        <CarouselContent className="-ml-4">
          {isLoading
            ? [1, 2, 3].map((i) => (
                <CarouselItem
                  key={i}
                  className="md:basis-1/2 lg:basis-1/3 pl-4"
                >
                  <Skeleton className="w-full h-[442px]" />
                </CarouselItem>
              ))
            : outfits?.map((i) => (
                <CarouselItem
                  key={i.$id}
                  className="md:basis-1/2 lg:basis-1/3 pl-4"
                >
                  <Link
                    href={
                      "/outfit/" + i.name.toLowerCase().split(" ").join("-")
                    }
                  >
                    <ProductCard item={i} />
                  </Link>
                </CarouselItem>
              ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
