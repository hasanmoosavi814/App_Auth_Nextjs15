import { IBackBtnProps } from "@/types/element";
import { Button } from "@/components/ui/button";

import Link from "next/link";

const BackBtn = ({ label, href }: IBackBtnProps) => {
  return (
    <Button className="font-normal w-full" asChild variant={"link"} size={"sm"}>
      <Link href={href}>{label}</Link>
    </Button>
  );
};

export default BackBtn;
