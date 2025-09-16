"use client";

import { useParams } from "next/navigation";

const Watch = () => {
  const { slug } = useParams();
  return <div>Watch: {slug}</div>;
};

export default Watch;
