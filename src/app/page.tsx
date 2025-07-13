import { Poppins } from "next/font/google";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import LoginBtn from "@/components/modules/auth/login-btn";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

const Home = () => {
  return (
    <main
      className="flex h-screen flex-col items-center justify-center bg-gradient-radial px-4"
      style={{
        backgroundImage: "radial-gradient(ellipse at top, #38bdf8, #1e3a8a)",
      }}
    >
      <div className="text-center space-y-8 animate-fade-up">
        <h1
          className={cn(
            "text-6xl font-semibold text-white drop-shadow-md flex items-center justify-center gap-3",
            font.className
          )}
        >
          <Image
            width={48}
            height={48}
            src="https://img.icons8.com/fluency/48/lock-2--v1.png"
            alt="lock"
          />
          Auth
        </h1>
        <p className="text-white text-lg">A simple authentication service</p>
        <div>
          <LoginBtn>
            <Button
              className="bg-white text-black hover:bg-gray-100 border border-gray-300 shadow"
              size="lg"
            >
              Sign in
            </Button>
          </LoginBtn>
        </div>
      </div>
    </main>
  );
};

export default Home;
