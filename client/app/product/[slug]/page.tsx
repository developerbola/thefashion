"use client";

import { useParams } from "next/navigation";

const Watch = () => {
  const { slug } = useParams();
  return <div>Product: {slug}</div>;
};

export default Watch;
