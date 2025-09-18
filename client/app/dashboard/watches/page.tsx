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

type Watch = {
  $id: string;
  name: string;
  price: number;
  imageUrl: string;
};

export default function WatchesDashboard() {
  const [search, setSearch] = useState("");
  const [watches, setWatches] = useState<Watch[]>([]);
  const [loading, setLoading] = useState(true);

  const filtered = watches.filter((w) =>
    w.name.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    const fetchWatches = async () => {
      try {
        setLoading(true);
        const data = await api("get", "/watches");
        setWatches(data);
      } catch (error) {
        console.error("Error fetching watches: " + error);
      } finally {
        setLoading(false);
      }
    };

    fetchWatches();
  }, []);

  return (
    <div className="p-6">
      <div className="mb-4 flex justify-between">
        <h2 className="text-xl font-semibold">Watches</h2>
        <div className="flex gap-2">
          <Input
            placeholder="Search ..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-64"
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
                    <Delete />
                    <Edit watch={watch} />
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
