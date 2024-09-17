import Heading from "@/app/components/Heading";
import React from "react";
import AuctionForm from "../AuctionForm";

export default function Create() {
  return (
    <div className="mx-auto max-w-[75%] shadow-lg bg-white rounded-md p-10">
      <Heading
        title="Sell your car!"
        subTitle="Please enter the details of your car"
      />
      <AuctionForm />
    </div>
  );
}
