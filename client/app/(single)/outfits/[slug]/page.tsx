"use client";

import { api } from "@/lib/api";
import { useParams } from "next/navigation";
import { useEffect } from "react";

const Outfit = () => {
  const { slug } = useParams();
  useEffect(() => {
    const fetch = async () => {
      const product = api('get','/product')
    };
  }, []);

  return <div>Product: {slug}</div>;
};

export default Outfit;
