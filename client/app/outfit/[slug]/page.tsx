"use client";

import { useParams } from "next/navigation";

const Product = () => {
  const { slug } = useParams();
  return <div>Outfit: {slug}</div>;
};

export default Product;
