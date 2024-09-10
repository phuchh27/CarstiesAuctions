"use client";
import { Pagination } from "flowbite-react";

type Props = {
  curentPage: number;
  pageCount: number;
  pageChanged: (page: number) => void;
};

export default function AppPagination({
  curentPage,
  pageCount,
  pageChanged
}: Props) {
  return (
    <Pagination
      currentPage={curentPage}
      onPageChange={(e) => pageChanged(e)}
      totalPages={pageCount}
      layout="pagination"
      showIcons={true}
      className=" text-blue-500 mb-5"
    />
  );
}
