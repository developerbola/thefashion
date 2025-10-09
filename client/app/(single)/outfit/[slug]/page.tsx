"use client";

import { useParams } from "next/navigation";
import SingleProduct from "@/components/SingleProduct";

const Outfit = () => {
  const { slug } = useParams();

  return <SingleProduct bg="#fafafa" path="outfits" slug={slug} />;
};

export default Outfit;
