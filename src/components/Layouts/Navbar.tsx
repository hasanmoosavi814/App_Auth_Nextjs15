"use client";

import { settingsRoutes } from "@/utils/SettingsRoutes";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

import UserBtn from "@/components/modules/user-btn";
import Link from "next/link";

const Navbar = () => {
  // ========== Hooks =========
  const pathname = usePathname();

  // ========= Rendring =========
  return (
    <nav className="bg-secondary/80 backdrop-blur-md flex items-center justify-between p-4 rounded-xl w-full max-w-4xl mx-auto shadow-md">
      <div className="flex gap-2">
        {settingsRoutes.map(({ path, label }) => (
          <Button
            key={path}
            asChild
            variant={pathname === path ? "default" : "outline"}
            className="capitalize"
          >
            <Link href={path}>{label}</Link>
          </Button>
        ))}
      </div>
      <UserBtn />
    </nav>
  );
};

export default Navbar;
