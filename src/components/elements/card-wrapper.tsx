"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ICardWrapperProps } from "@/types/element";
import { CardHeader } from "@/components/ui/card";

import BackBtn from "@/components/elements/backBtn";
import Header from "@/components/elements/header";
import Social from "@/components/elements/social";

const CardWrapper = ({
  showSocial,
  headerLabel,
  backBtnHref,
  backBtnLabel,
  children,
}: ICardWrapperProps) => {
  return (
    <Card className="w-[400px]">
      <CardHeader>
        <Header label={headerLabel} />
      </CardHeader>
      <CardContent>{children}</CardContent>
      {showSocial && (
        <CardFooter>
          <Social />
        </CardFooter>
      )}
      <CardFooter>
        <BackBtn label={backBtnLabel} href={backBtnHref} />
      </CardFooter>
    </Card>
  );
};

export default CardWrapper;
