"use client";

import { useParams } from "next/navigation";
import SingleProduct from "@/components/SingleProduct";

const Watch = () => {
  const { slug } = useParams();

  return <SingleProduct bg="#f5f5f5" path="watches" slug={slug} />;
};

export default Watch;
