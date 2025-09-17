"use client";

import { useParams } from "next/navigation";

const ShopByKey = () => {
  const { key } = useParams();
  return <div>ShopBy: {key}</div>;
};

export default ShopByKey;
