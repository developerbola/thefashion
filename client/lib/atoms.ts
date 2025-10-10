import { atom } from "jotai";

export const cartAtom = atom<CartProductType[]>([]);

export const outfitsAtom = atom<ProductType[]>([]);
export const watchesAtom = atom<ProductType[]>([]);
