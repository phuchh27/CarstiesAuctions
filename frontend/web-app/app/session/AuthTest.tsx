"use client";
import React, { useState } from "react";
import { updateAuctionTest } from "../actions/auctionAction";
import { Button } from "flowbite-react";

export default function AuthTest() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState();

  function doUpdate() {
    setResult(undefined);
    setLoading(true);
    updateAuctionTest()
      .then((res) => setResult(res))
      .catch((err) => setResult(err))
      .finally(() => setLoading(false));
  }
  return (
    <div className=" flex items-center gap-4">
      <Button outline isProcessing={loading} onClick={doUpdate}>
        Test auth
      </Button>
      <div className="">{JSON.stringify(result, null, 2)}</div>
    </div>
  );
}
