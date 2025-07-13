"use client";

import { ILoginBtn } from "@/types/modules";
import { useRouter } from "next/navigation";

const LoginBtn = ({ children, mode = "redirect", asChild }: ILoginBtn) => {
  // ============ Router =============
  const router = useRouter();

  // ============ Function =============
  const onClick = () => {
    router.push("/auth/login");
  };

  // ============ Rendering =============
  if (mode === "modal") return <span>TODO:IMPLEMENTED</span>;
  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  );
};

export default LoginBtn;
