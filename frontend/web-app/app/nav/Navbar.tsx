"use client";
import React, { useEffect, useState } from "react";
import Search from "./Search";
import Logo from "./Logo";
import LoginButton from "./LoginButton";
import { getCurrentUser } from "../actions/authActions";
import UserActions from "./UserActions";
import { User } from "next-auth";

export default function Navbar() {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    async function fetchUser() {
      const userData = await getCurrentUser();
      if (userData) {
        setUser(userData);
      }
    }
    fetchUser();
  }, []);

  console.log("client component");
  return (
    <header className="sticky top-0 z-50 flex justify-between bg-white p-5 items-center text-gray-800 shadow-md">
      <Logo />
      <Search />
      {user ? <UserActions user={user} /> : <LoginButton />}
    </header>
  );
}
