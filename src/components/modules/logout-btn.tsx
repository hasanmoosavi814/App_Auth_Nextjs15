"use client";

import { signOut } from "next-auth/react";

export const LogoutBtn = ({ children }: { children: React.ReactNode }) => {
  const handleLogout = () => {
    signOut();
  };
  return (
    <span onClick={handleLogout} className="cursor-pointer">
      {children}
    </span>
  );
};
