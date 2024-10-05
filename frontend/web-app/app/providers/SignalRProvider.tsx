"use client";
import { ReactNode, useCallback, useEffect, useRef } from "react";
import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import { useAuctionStore } from "@/hooks/useAuctionStore";
import { useBidStore } from "@/hooks/useBidStore";
import { useParams } from "next/navigation";
import { Auction, AuctionFinished, Bid } from "../types";
import { User } from "next-auth";
import toast from "react-hot-toast";
import AuctionCreateToast from "../components/AuctionCreateToast";
import { getDetailViewData } from "../actions/auctionAction";
import AuctionFinishedToast from "../components/AuctionFinishedToast";


type Props = {
  children: ReactNode;
  user?: User;
  notifyUrl: string
};

export default function SignalRProvider({ children, user, notifyUrl }: Props) {
  const connection = useRef<HubConnection | null>(null);
  const setCurrentprice = useAuctionStore((state) => state.setCurrentPrice);
  const addBid = useBidStore((state) => state.addBid);
  const params = useParams<{ id: string }>();

  const handleAuctionFinished = useCallback(
    (finishedAuction: AuctionFinished) => {
      const auction = getDetailViewData(finishedAuction.auctionId);

      return toast.promise(
        auction,
        {
          loading: "loading",
          success: (auction) => (
            <AuctionFinishedToast
              auction={auction}
              finishedAuction={finishedAuction}
            />
          ),
          error: (err) => `Auction finished with error: ${err.message}`
        },
        { success: { duration: 10000, icon: null } }
      );
    },
    []
  );

  const handleAuctionCreated = useCallback(
    (auction: Auction) => {
      if (user?.username !== auction.seller) {
        return toast(<AuctionCreateToast auction={auction} />, {
          duration: 10000
        });
      }
    },
    [user?.username]
  );

  const handleBidPlace = useCallback(
    (bid: Bid) => {
      if (bid.bidStatus.includes("Accepted")) {
        setCurrentprice(bid.auctionId, bid.amount);
      }

      if (params.id === bid.auctionId) {
        addBid(bid);
      }
    },
    [setCurrentprice, addBid, params.id]
  );

  useEffect(() => {
    if (!connection.current) {
      connection.current = new HubConnectionBuilder()
        .withUrl(notifyUrl)
        .withAutomaticReconnect()
        .build();

      connection.current
        .start()
        .then(() => "Connected to notifications hub")
        .catch((err) => toast.error(err.message));
    }

    connection.current.on("BidPlaced", handleBidPlace);
    connection.current.on("AuctionCreated", handleAuctionCreated);
    connection.current.on("AuctionFinished", handleAuctionFinished);

    return () => {
      connection.current?.off("BidPlaced", handleBidPlace);
      connection.current?.off("AuctionCreated", handleAuctionCreated);
      connection.current?.off("AuctionFinished", handleAuctionFinished);
    };
  }, [
    setCurrentprice,
    handleBidPlace,
    handleAuctionCreated,
    handleAuctionFinished,
    notifyUrl
  ]);

  return children;
}
