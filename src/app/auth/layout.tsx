import { PropsWithChildren } from "react";

const AuthLayout = ({ children }: PropsWithChildren) => {
  return (
    <div
      className="flex h-screen flex-col items-center justify-center bg-gradient-radial px-4"
      style={{
        backgroundImage: "radial-gradient(ellipse at top, #38bdf8, #1e3a8a)",
      }}
    >
      {children}
    </div>
  );
};

export default AuthLayout;
