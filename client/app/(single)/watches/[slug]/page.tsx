"use client";

import { api } from "@/lib/api";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const Watch = () => {
  const [product, setProduct] = useState<ProductType[]>([]);
  const { slug } = useParams();
  useEffect(() => {
    const fetch = async () => {
      const data = await api("get", `/watches/${slug}`);
      setProduct(data);
    };
    fetch();
  }, []);

  return (
    <div>
      Product: <code>{product?.toString()}</code>
    </div>
  );
};

export default Watch;
