"use client";

import { useCallback, useEffect, useState } from "react";
import { newVerification } from "@/actions/new-verification";
import { useSearchParams } from "next/navigation";
import { BeatLoader } from "react-spinners";

import CardWrapper from "../elements/card-wrapper";
import FormSuccess from "../elements/form-success";
import FormErrors from "../elements/form-error";

const NewVerificationForm = () => {
  // ======== State to handle error messages ========
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  // ======== Use searchParams to get the token from the URL ========
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  // ======== If token is not present, show error message ========
  const onSubmit = useCallback(() => {
    if (success || error) return;
    if (!token) {
      setError("Token is required");
      return;
    }
    newVerification(token)
      .then((data) => {
        setSuccess(data.success);
        setError(data.error);
      })
      .catch((err) => {
        console.error("Error during verification:", err);
        setError("An error occurred during verification. Please try again.");
      });
  }, [token, success, error]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  //   ======== If token is not present, show loading spinner ========
  return (
    <CardWrapper
      headerLabel="Confirmation your verification"
      backBtnHref="/auth/login"
      backBtnLabel="Back to Login"
    >
      <div className="flex items-center w-full justify-center">
        {!success && !error && <BeatLoader />}
        {success && <FormSuccess message={success} />}
        {error && <FormErrors message={error} />}
      </div>
    </CardWrapper>
  );
};

export default NewVerificationForm;
