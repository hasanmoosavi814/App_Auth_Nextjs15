"use client";

import { useCallback, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { newVerification } from "@/actions/new-verification";
import { BeatLoader } from "react-spinners";

import CardWrapper from "../elements/card-wrapper";
import FormSuccess from "../elements/form-success";
import FormErrors from "../elements/form-error";

const NewVerificationForm = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const onSubmit = useCallback(() => {
    if (!token) {
      setError("Verification token is required.");
      return;
    }

    newVerification(token)
      .then((res) => {
        if (res.error) {
          setError(res.error);
        } else if (res.success) {
          setSuccess(res.success);
          setTimeout(() => {
            router.push("/auth/login?verified=true");
          }, 2500); // Delay to show success message
        }
      })
      .catch((err) => {
        console.error("[NEW_VERIFICATION_CLIENT_ERROR]:", err);
        setError("An unexpected error occurred. Please try again.");
      });
  }, [token, router]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <CardWrapper
      headerLabel="Email Verification"
      backBtnHref="/auth/login"
      backBtnLabel="Back to Login"
    >
      <div className="flex items-center w-full justify-center min-h-[80px]">
        {!success && !error && <BeatLoader />}
        {success && <FormSuccess message={success} />}
        {error && <FormErrors message={error} />}
      </div>
    </CardWrapper>
  );
};

export default NewVerificationForm;
