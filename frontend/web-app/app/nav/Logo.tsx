"use client";
import { useParamsStore } from "@/hooks/useParamsStore";
import React from "react";
import { AiOutlineCar } from "react-icons/ai";

export default function Logo() {
  const reset = useParamsStore((state) => state.reset);
  return (
    <div
      onClick={reset}
      className=" cursor-pointer flex gap-3 items-center text-3xl font-semibold text-red-500"
    >
      <AiOutlineCar size={34} />
      <div className="">Carsties Auctions</div>
    </div>
  );
}
