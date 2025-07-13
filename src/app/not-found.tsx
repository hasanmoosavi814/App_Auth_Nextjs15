"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

const NotFound = () => {
  return (
    <main className="flex h-screen items-center justify-center bg-background px-4">
      <div className="text-center animate-fade-in-up space-y-6">
        <h1 className="text-7xl font-bold text-destructive drop-shadow-sm">
          404
        </h1>
        <p className="text-lg text-muted-foreground">
          Sorry, the page you’re looking for doesn’t exist.
        </p>
        <Link href="/">
          <Button variant="default" size="lg">
            Go Home
          </Button>
        </Link>
      </div>
    </main>
  );
};

export default NotFound;
