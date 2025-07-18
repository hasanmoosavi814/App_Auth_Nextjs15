import { Suspense } from "react";

import NewVerificationForm from "@/components/modules/new-verification-form";

const NewVerification = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NewVerificationForm />
    </Suspense>
  );
};

export default NewVerification;
