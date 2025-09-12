"use client";
import { api } from "@/lib/api";
import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

type OutfitType = {
  $id: number;
  name: string;
  price: number;
  imageUrl: string;
};

export default function Outfits() {
  const [outfits, setOutfits] = useState<OutfitType[]>([]);
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();

  useEffect(() => {
    async function fetchOutfits() {
      const res = await api("get", "/products");
      setOutfits(res);
    }
    fetchOutfits();
  }, []);

  return (
    <div className="pt-5 md:pt-18 pb-[300px]">
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
              href={"/shop?category=outfits"}
              className="text-lg md:text-2xl lg:text-3xl font-semibold whitespace-nowrap"
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
          {outfits?.length > 0
            ? outfits.map((i, _) => (
                <CarouselItem
                  key={i.$id}
                  className="md:basis-1/2 lg:basis-1/3 pl-4"
                >
                  <div className="relative p-4 grid place-items-center bg-[#fafafa] cursor-pointer">
                    <div className="absolute p-4 flex flex-col justify-between h-full w-full">
                      <div className="flex justify-between">
                        <p className="text-base md:text-xl font-medium">
                          CLASSICS
                        </p>
                        <p className="text-base md:text-xl font-medium">
                          ${i.price}
                        </p>
                      </div>
                      <div className="w-full">
                        <p className="text-lg md:text-2xl font-semibold">
                          {i.name}
                        </p>
                      </div>
                    </div>
                    <img
                      src={i.imageUrl}
                      alt={i.name}
                      className="w-auto h-[85%]"
                    />
                  </div>
                </CarouselItem>
              ))
            : [1, 2, 3].map((i) => (
                <CarouselItem
                  key={i}
                  className="md:basis-1/2 lg:basis-1/3 pl-4"
                >
                  <Skeleton className="w-full h-[442px]" />
                </CarouselItem>
              ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
