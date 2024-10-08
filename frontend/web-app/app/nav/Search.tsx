"use client";
import { useParamsStore } from "@/hooks/useParamsStore";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { FaSearch } from "react-icons/fa";

export default function Search() {
  const router = useRouter();
  const pathname = usePathname();
  const setParams = useParamsStore((state) => state.setParams);
  const setSearchvalue = useParamsStore((state) => state.setSearchvalue);
  const searchValue = useParamsStore((state) => state.searchValue);
  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchvalue(e.target.value);
  }

  function search() {
    if (pathname !== "/") router.push("/");
    setParams({ searchTerm: searchValue });
  }

  return (
    <div className="flex w-[50%] items-center border-2 rounded-full py-2 shadow-sm">
      <input
        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
          if (e.key === "Enter") search();
        }}
        onChange={onChange}
        value={searchValue}
        className=" 
        input-custom
        text-sm
        text-gray-600"
        type="text"
        placeholder="Search for car by make, model or color"
      />
      <button onClick={search}>
        <FaSearch
          size={35}
          className=" bg-red-400 text-white rounded-full p-2 cursor-pointer mx-2"
        />
        {""}
      </button>
    </div>
  );
}
