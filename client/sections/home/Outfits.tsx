"use client";
import { api } from "@/lib/api";
import { useEffect, useState } from "react";

type OutfitType = {
  $id: number;
  name: string;
  price: number;
  image: string;
};

export default function Outfits() {
  const [outfits, setOutfits] = useState<OutfitType[]>([]);

  useEffect(() => {
    async function fetchOutfits() {
      const res = await api("get", "/products");
      setOutfits(res);
    }
    fetchOutfits();
  }, []);

  return (
    <div>
      <div>
        <p>Outfits</p>
        <div>
          {outfits.map((i) => (
            <div key={i.$id}>{i.name}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
