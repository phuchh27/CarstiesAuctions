/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { getBidForAuction } from "@/app/actions/auctionAction";
import Heading from "@/app/components/Heading";
import { Auction, Bid } from "@/app/types";
import { useBidStore } from "@/hooks/useBidStore";
import { User } from "next-auth";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import BidItem from "../../update/[id]/BidItem";
import { numberWithCommas } from "@/app/lib/numberWithComma";
import EmptyFilter from "@/app/components/EmptyFilter";
import BidForm from "./BidForm";

type Props = {
  user: User | null;
  auction: Auction;
};
export default function BidList({ user, auction }: Readonly<Props>) {
  const [loading, setLoading] = useState(true);
  const bids = useBidStore((state) => state.bids);
  const setBids = useBidStore((state) => state.setBids);
  const open = useBidStore((state) => state.open);
  const setOpen = useBidStore((state) => state.setOpen);
  const openForBid = new Date(auction.auctionEnd) > new Date();

  const highBid = bids.reduce((prev, current) => {
    if (current.bidStatus.includes("Accepted")) {
      return Math.max(prev, current.amount);
    }
    return prev;
  }, 0);

  useEffect(() => {
    getBidForAuction(auction.id)
      .then((res: any) => {
        if (res.error) {
          throw res.error;
        }
        setBids(res as Bid[]);
      })
      .catch((err) => {
        toast.error(err.message);
      })
      .finally(() => setLoading(false));
  }, [auction.id, setLoading, setBids]);

  useEffect(() => {
    setOpen(openForBid);
  }, [openForBid, setOpen]);

  if (loading) return <span>Loading...</span>;
  return (
    <div className="rounded-lg shadow-md">
      <div className="py-2 px-4 bg-white">
        <div className=" sticky top-0 bg-white p-2">
          <Heading
            title={`Current high bid is ${numberWithCommas(highBid)}`}
            subTitle=""
          />
        </div>
      </div>

      <div className=" overflow-auto h-[400px] flex flex-col-reverse px-2">
        {bids.length === 0 ? (
          <EmptyFilter
            title="No bid for this auction"
            subTitle="Please feel to make a bid"
          />
        ) : (
          <>
            {bids
              .toSorted((a, b) => a.amount - b.amount)
              .map((bid) => (
                <BidItem key={bid.id} bid={bid} />
              ))}
          </>
        )}
      </div>

      <div className="px-2 pb-2 text-gray-500">
        {(() => {
          if (!open) {
            return (
              <div className="flex items-center justify-center p-2 text-lg font-semibold">
                This auction has finished
              </div>
            );
          }

          if (!user) {
            return (
              <div className="flex items-center justify-center p-2 text-lg font-semibold">
                Please login to make a bid
              </div>
            );
          }

          if (user.username === auction.seller) {
            return (
              <div className="flex items-center justify-center p-2 text-lg font-semibold">
                You cannot bid on your own auction
              </div>
            );
          }

          return <BidForm auctionId={auction.id} highBid={highBid} />;
        })()}
      </div>
    </div>
  );
}
