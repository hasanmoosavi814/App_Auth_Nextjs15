"use client";

import { DEFAULT_LOGIN_REDIRECT } from "@/route";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Button } from "../ui/button";
import { signIn } from "next-auth/react";

const Social = () => {
  // ======== Social Login Handlers ========
  const handleSocialLogin = (provider: "google" | "github") => {
    signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    });
  };

  // ======== Render Social Login Buttons ========
  return (
    <div className="flex items-center w-full gap-x-2">
      <Button
        className="flex-1"
        size="lg"
        variant="outline"
        onClick={() => handleSocialLogin("google")}
      >
        <FcGoogle className="h-5 w-5" />
      </Button>
      <Button
        className="flex-1"
        size="lg"
        variant="outline"
        onClick={() => handleSocialLogin("github")}
      >
        <FaGithub className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default Social;
