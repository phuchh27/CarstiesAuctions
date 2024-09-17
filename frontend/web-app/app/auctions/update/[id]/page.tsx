import React from "react";
import Heading from "@/app/components/Heading";
import AuctionForm from "../../AuctionForm";
import { getDetailViewData } from "@/app/actions/auctionAction";
export default async function Update({ params }: { params: { id: string } }) {
  const data = await getDetailViewData(params.id);
  return (
    <div className=" mx-auto max-w-[75%] shadow-lg bg-white rounded-lg">
      <Heading
        title="Update your auction"
        subTitle="please update the detail of your car"
      />
      <AuctionForm auction={data} />
    </div>
  );
}
