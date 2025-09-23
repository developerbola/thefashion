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
import { useAtom } from "jotai";
import { watchesAtom } from "@/lib/atoms";
import { fetchProduct } from "@/lib/utils";
import Add from "@/components/actions/Add";
import Delete from "@/components/actions/Delete";
import Edit from "@/components/actions/Edit";

export default function WatchesDashboard() {
  const [search, setSearch] = useState("");
  const [watches, setWatches] = useAtom(watchesAtom);
  const [loading, setLoading] = useState(false);

  const filtered = watches.filter((w) =>
    w.name.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    if (!watches.length) {
      fetchProduct(setLoading, setWatches, "watches");
    }
  }, [watches.length]);

  return (
    <div className="p-6">
      <div className="mb-4 flex justify-between">
        <h2 className="text-xl font-semibold">Watches</h2>
        <div className="flex gap-2">
          <Input
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-48"
          />
          <Add path="watches" />
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
            ) : filtered.length === 0 && !loading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center p-4 text-sm">
                  No results.
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((watch, idx) => (
                <TableRow key={watch.$id}>
                  <TableCell>{idx + 1}</TableCell>
                  <TableCell>{watch.name}</TableCell>
                  <TableCell>
                    <img
                      src={watch.imageUrl}
                      alt={watch.name}
                      className="h-[30px] w-auto rounded"
                    />
                  </TableCell>
                  <TableCell>${watch.price.toLocaleString()}</TableCell>
                  <TableCell className="flex gap-2">
                    <Delete path="watches" id={watch.$id} />
                    <Edit product={watch} path="watches" />
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
