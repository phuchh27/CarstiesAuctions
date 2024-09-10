import React from "react";
import { Button, ButtonGroup } from "flowbite-react";
import { useParamsStore } from "@/hooks/useParamsStore";
import { AiOutlineClockCircle, AiOutlineSortAscending } from "react-icons/ai";
import { BsFillStopCircleFill, BsStopwatchFill } from "react-icons/bs";
import { GiFinishLine, GiFlame } from "react-icons/gi";

const pageSizeButtons = [4, 8, 12];
const orderButtons = [
  {
    label: "Alphabetical",
    icon: AiOutlineSortAscending,
    value: "make"
  },
  {
    label: "End date",
    icon: AiOutlineClockCircle,
    value: "endingSoon"
  },
  {
    label: "Recently added",
    icon: BsFillStopCircleFill,
    value: "new"
  }
];

const fillterButtons = [
  {
    label: "Live Auction",
    icon: GiFlame,
    value: "live"
  },
  {
    label: "Ending < 6 hours",
    icon: GiFinishLine,
    value: "endingSoon"
  },
  {
    label: "Completed",
    icon: BsStopwatchFill,
    value: "finished"
  }
];

export default function Filters() {
  const pageSize = useParamsStore((state) => state.pageSize);
  const setParams = useParamsStore((state) => state.setParams);
  const orderBy = useParamsStore((state) => state.orderBy);
  const filterBy = useParamsStore((state) => state.filterBy);

  return (
    <div className=" grid md:grid-cols-1 lg:grid-cols-2 xl:flex justify-between items-center mb-4 ">
      <div className="mb-3">
        <span className=" uppercase text-sm text-gray-500 mr-2">Filter by</span>
        <ButtonGroup>
          {fillterButtons.map(({ label, icon: Icon, value }) => (
            <Button
              className="p-1 flex items-center justify-center"
              key={value}
              onClick={() => setParams({ filterBy: value })}
              color={`${filterBy === value ? "red" : "gray"}`}
            >
              <Icon className="mr-3 h-4 w-4" />
              {label}
            </Button>
          ))}
        </ButtonGroup>
      </div>

      <div className="mb-3">
        <span className=" uppercase text-sm text-gray-500 mr-2">Order by</span>
        <ButtonGroup>
          {orderButtons.map(({ label, icon: Icon, value }) => (
            <Button
              className="p-1 flex items-center justify-center"
              key={value}
              onClick={() => setParams({ orderBy: value })}
              color={`${orderBy === value ? "red" : "gray"}`}
            >
              <Icon className="mr-3 h-4 w-4" />
              {label}
            </Button>
          ))}
        </ButtonGroup>
      </div>
      <div className="mb-3">
        <span className=" uppercase text-sm text-gray-500 mr-2">Page size</span>
        <ButtonGroup>
          {pageSizeButtons.map((value, i) => (
            <Button
              key={i}
              onClick={() => setParams({ pageSize: value })}
              color={`${pageSize === value ? "red" : "gray"}`}
            >
              {value}
            </Button>
          ))}
        </ButtonGroup>
      </div>
    </div>
  );
}
