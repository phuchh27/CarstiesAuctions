import { Auction, PageResult } from "@/app/types";
import { create } from "zustand";
type State = {
  auctions: Auction[];
  totalCount: number;
  pageCount: number;
};

type Auctions = {
  setData: (data: PageResult<Auction>) => void;
  setCurrentPrice: (auctionId: string, amount: number) => void;
};

const initialState: State = {
  auctions: [],
  pageCount: 0,
  totalCount: 0
};

export const useAuctionStore = create<State & Auctions>((set) => ({
  ...initialState,

  setData: (data: PageResult<Auction>) => {
    set(() => ({
      auctions: data.result,
      totalCount: data.totalCount,
      pageCount: data.pageCount
    }));
  },

  setCurrentPrice: (auctionId: string, amount: number) => {
    set((state) => ({
      auctions: state.auctions.map((auction) =>
        auction.id === auctionId
          ? { ...auction, currentHighBid: amount }
          : auction
      )
    }));
  }
}));
