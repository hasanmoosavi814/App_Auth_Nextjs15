import { Suspense } from "react";

import LoginForm from "@/components/modules/login-form";

const LoginPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginForm />
    </Suspense>
  );
};

export default LoginPage;
