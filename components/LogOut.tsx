"use client";

import { auth } from "@/firebase/client";
import { logOutUser } from "@/lib/actions/auth.actions";
import { signOut } from "firebase/auth";
import Image from "next/image";
import { useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const LogOut = () => {
  useEffect(() => {
    console.log("✅ LogOut Component Rendered!");
  }, []);

  const userLogOut = async () => {
    await signOut(auth);
    await logOutUser();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Image
          src="/user-avatar.png"
          alt="user profile"
          width={48}
          height={48}
          className="rounded-full object-cover cursor-pointer"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer">Profile</DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">Billing</DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">Team</DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">
          Subscription
        </DropdownMenuItem>
        <DropdownMenuItem onClick={userLogOut} className="cursor-pointer">
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>

    // <div onClick={logOut} className="cursor-pointer">
    //   <Image
    //     src="/user-avatar.png"
    //     alt="user profile"
    //     width={48}
    //     height={48}
    //     className="rounded-full"
    //   />
    // </div>
  );
};

export default LogOut;
