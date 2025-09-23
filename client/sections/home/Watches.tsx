"use client";

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
import ProductCard from "@/components/ProductCard";
import { useAtom } from "jotai";
import { watchesAtom } from "@/lib/atoms";
import { fetchProduct } from "@/lib/utils";

export default function Watches() {
  const [watches, setWatches] = useAtom(watchesAtom);
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!watches.length) {
      fetchProduct(setLoading, setWatches, "watches");
    }
  }, []);

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
            Watches
          </p>

          <div className="flex items-center gap-3 md:gap-5">
            <Link
              href={"/shop/watches"}
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
          {loading
            ? [1, 2, 3].map((i) => (
                <CarouselItem
                  key={i}
                  className="md:basis-1/2 lg:basis-1/3 pl-4"
                >
                  <Skeleton className="w-full aspect-square" />
                </CarouselItem>
              ))
            : watches.map((i, _) => (
                <CarouselItem
                  key={i.$id}
                  className="md:basis-1/2 lg:basis-1/3 pl-4"
                >
                  <Link
                    href={"/watch/" + i.name.toLowerCase().split(" ").join("-")}
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
