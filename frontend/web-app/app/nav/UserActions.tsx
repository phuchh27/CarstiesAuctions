"use client";
import { Dropdown, DropdownDivider, DropdownItem } from "flowbite-react";
import React from "react";
import Link from "next/link";
import { User } from "next-auth";
// import { useRouter } from "next/navigation";
import { HiCog, HiUser } from "react-icons/hi";
import { AiFillCar, AiFillTrophy, AiOutlineLogout } from "react-icons/ai";
import { signOut } from "next-auth/react";

type Props = {
  user: User;
};
export default function UserActions({ user }: Props) {
//   const router = useRouter();
  return (
    <Dropdown inline label={`Welcome ${user.name}`}>
      <DropdownItem icon={HiUser}>
        <Link href="/">My Auction</Link>
      </DropdownItem>
      <DropdownItem icon={AiFillTrophy}>
        <Link href="/">Auctions won</Link>
      </DropdownItem>
      <DropdownItem icon={AiFillCar}>
        <Link href="/">Sell my car</Link>
      </DropdownItem>
      <DropdownItem icon={HiCog}>
        <Link href="/session">Session (dev only)</Link>
      </DropdownItem>
      <DropdownDivider />
      <DropdownItem
        icon={AiOutlineLogout}
        onClick={() => signOut({ callbackUrl: "/" })}
      >
        Sign out
      </DropdownItem>
    </Dropdown>
  );
}
