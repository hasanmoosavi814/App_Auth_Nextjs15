import { IHeaderProps } from "@/types/element";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

import Image from "next/image";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

const Header = ({ label }: IHeaderProps) => {
  return (
    <div className="w-full flex flex-col items-center justify-center gap-y-4">
      <h1
        className={cn(
          "text-3xl font-semibold flex items-center",
          font.className
        )}
      >
        <Image
          width={30}
          height={30}
          src="https://img.icons8.com/fluency/48/lock-2--v1.png"
          alt="lock"
        />
        Auth
      </h1>
      <p className="text-muted-foreground text-sm">{label}</p>
    </div>
  );
};

export default Header;
