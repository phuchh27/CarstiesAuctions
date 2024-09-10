"use client";
import React, { useEffect, useState } from "react";
import AuctionsCard from "./AuctionsCard";
import AppPagination from "../components/AppPagination";
import { Auction, PageResult } from "../types";
import { getData } from "../actions/auctionAction";
import Filters from "./Filters";
import { useParamsStore } from "@/hooks/useParamsStore";
import { useShallow } from "zustand/react/shallow";
import qs from "query-string";
import EmptyFilter from "../components/EmptyFilter";

export default function Listing() {
  const [data, setData] = useState<PageResult<Auction>>();
  const params = useParamsStore(
    useShallow((state) => ({
      pageNumber: state.pageNumber,
      pageSize: state.pageSize,
      searchTerm: state.searchTerm,
      orderBy: state.orderBy,
      filterBy: state.filterBy
    }))
  );

  const setparams = useParamsStore((state) => state.setParams);
  const url = qs.stringifyUrl({ url: "", query: params });

  function setPageNumber(pageNumber: number) {
    setparams({ pageNumber: pageNumber });
  }

  useEffect(() => {
    getData(url).then((data) => {
      setData(data);
    });
  }, [url]);

  if (!data) return <h3>Loanding ...</h3>;

  return (
    <>
      <Filters />
      {data.totalCount === 0 ? (
        <EmptyFilter />
      ) : (
        <>
          <div className="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {data.result.map((auction) => (
              <AuctionsCard key={auction.id} auction={auction} />
            ))}
          </div>
          <div className=" flex justify-center mt-4">
            <AppPagination
              pageChanged={setPageNumber}
              curentPage={params.pageNumber}
              pageCount={data.pageCount}
            />
          </div>
        </>
      )}
    </>
  );
}
