"use client";

import { useState } from "react";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SquarePen } from "lucide-react";

type EditProps = {
  watch: {
    $id: string;
    name: string;
    price: number;
    imageUrl: string;
  };
  onUpdated?: () => void;
};

const Edit = ({ watch }: EditProps) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(watch.name);
  const [price, setPrice] = useState(watch.price.toString());
  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    if (image) formData.append("image", image);

    try {
      await api("put", `/watches/${watch.$id}`, formData);
      alert("Updated successfully!");
      setOpen(false);
    } catch (err) {
      console.error("Edit product error:", err);
    }
  };
  const isUnchanged =
    name === watch.name && price === watch.price.toString() && !image;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size={"icon"}>
          <SquarePen />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Watch</DialogTitle>
          <DialogDescription>
            Update the details below and save changes.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="price">Price</Label>
            <div className="relative">
              <span className="absolute left-3 top-[48%] -translate-y-1/2 text-gray-500">
                $
              </span>
              <Input
                id="price"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                className="pl-7"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Change Image</Label>
            <div className="flex gap-2 items-center">
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setImage(e.target.files ? e.target.files[0] : null)
                }
              />
              {watch.imageUrl && (
                <img
                  src={watch.imageUrl}
                  alt={watch.name}
                  className="h-[40px] rounded-[4px]"
                />
              )}
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isUnchanged}>
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Edit;
