"use client";
import React, { useState } from "react";
import { Button } from "flowbite-react";
import { useRouter } from "next/navigation";
import { deleteAuction } from "@/app/actions/auctionAction";
import toast from "react-hot-toast";

type Props = {
  id: string;
};
export default function DeleteButton({ id }: Props) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  function onDelete() {
    setLoading(true);
    deleteAuction(id)
      .then((res) => {
        if (res.error) throw res.error;
        router.push("/");
      })
      .catch((error) => {
        toast.error(error.status + " " + error.message);
      })
      .finally(() => setLoading(false));
  }
  return (
    <Button color="failure" isProcessing={loading} onClick={onDelete}>
      Delete Auction
    </Button>
  );
}
