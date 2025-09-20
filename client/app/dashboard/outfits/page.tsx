"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/lib/api";
import Delete from "./Delete";
import Add from "./Add";
import Edit from "./Edit";
import { useAtom } from "jotai";
import { outfitsAtom } from "@/lib/atoms";

export type OutfitType = {
  $id: string;
  name: string;
  price: number;
  imageUrl: string;
};

export default function OutfitsDashboard() {
  const [search, setSearch] = useState("");
  const [outfits, setWatches] = useAtom(outfitsAtom);
  const [loading, setLoading] = useState(false);

  const filtered = outfits.filter((w) =>
    w.name.toLowerCase().includes(search.toLowerCase())
  );

  const fetch = async () => {
    setLoading(true);
    try {
      const data = await api("get", "/outfits");
      setWatches(data);
    } catch (error) {
      console.error("Error fetching outfits:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (!outfits.length) {
      fetch();
    }
  }, []);

  return (
    <div className="p-6">
      <div className="mb-4 flex justify-between">
        <h2 className="text-xl font-semibold">Outfits</h2>
        <div className="flex gap-2">
          <Input
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-48"
          />
          <Add />
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Looks</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              Array.from({ length: 5 }).map((_, idx) => (
                <TableRow key={idx}>
                  <TableCell>
                    <Skeleton className="h-4 w-6" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-24" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-8 w-8 rounded-md" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-14" />
                  </TableCell>
                  <TableCell className="flex gap-2">
                    <Skeleton className="h-8 w-8" />
                    <Skeleton className="h-8 w-8" />
                  </TableCell>
                </TableRow>
              ))
            ) : filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center p-4 text-sm">
                  No results.
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((outfit, idx) => (
                <TableRow key={outfit.$id}>
                  <TableCell>{idx + 1}</TableCell>
                  <TableCell>{outfit.name}</TableCell>
                  <TableCell>
                    <img
                      src={outfit.imageUrl}
                      alt={outfit.name}
                      className="h-[30px] w-auto rounded"
                    />
                  </TableCell>
                  <TableCell>${outfit.price.toLocaleString()}</TableCell>
                  <TableCell className="flex gap-2">
                    <Delete />
                    <Edit outfit={outfit} />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
