import Navbar from "@/components/Layouts/Navbar";
import React from "react";

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className="flex h-screen flex-col items-center justify-center bg-gradient-radial px-4"
      style={{
        backgroundImage: "radial-gradient(ellipse at top, #38bdf8, #1e3a8a)",
      }}
    >
      <Navbar />
      {children}
    </div>
  );
};

export default ProtectedLayout;
