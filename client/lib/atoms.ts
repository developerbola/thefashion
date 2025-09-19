import type { WatchType } from "@/app/dashboard/watches/page";
import type { ProductType } from "@/sections/home/Outfits";
import { atom } from "jotai";

export const cartAtom = atom();

export const outfitsAtom = atom<ProductType[]>([]);
export const watchesAtom = atom<WatchType[]>([]);
