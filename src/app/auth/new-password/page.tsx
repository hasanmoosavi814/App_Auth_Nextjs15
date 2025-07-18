import { Suspense } from "react";

import NewPasswordForm from "@/components/modules/new-password-form";

const NewPassword = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NewPasswordForm />
    </Suspense>
  );
};

export default NewPassword;
