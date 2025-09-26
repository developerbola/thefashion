"use client";

import ProductCard from "@/components/ProductCard";
import { Skeleton } from "@/components/ui/skeleton";
import { outfitsAtom, watchesAtom } from "@/lib/atoms";
import { fetchProduct } from "@/lib/utils";
import { useAtom } from "jotai";
import { useEffect, useMemo, useState } from "react";

function mixArrays<T>(a: T[], b: T[]): T[] {
  const combined = [...a, ...b];
  for (let i = combined.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [combined[i], combined[j]] = [combined[j], combined[i]];
  }
  return combined;
}

const Shop = () => {
  const [loading, setLoading] = useState(false);
  const [outfits, setOutfits] = useAtom(outfitsAtom);
  const [watches, setWatches] = useAtom(watchesAtom);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      await Promise.all([
        !outfits.length && fetchProduct(setLoading, setOutfits, "outfits"),
        !watches.length && fetchProduct(setLoading, setWatches, "watches"),
      ]);
      setLoading(false);
    };
    fetch();
  }, []);

  const mixedProducts = useMemo(
    () => mixArrays(outfits, watches),
    [outfits, watches]
  );

  if (loading) {
    return (
      <div className="p-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div key={idx} className="space-y-3">
              <Skeleton className="w-full aspect-square rounded-xl" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {mixedProducts.map((i) => (
          <ProductCard item={i} key={i.$id} />
        ))}
      </div>
    </div>
  );
};

export default Shop;
