"use client";

import { FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { useEffect, useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Form, FormField, FormItem } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/schema";
import { LoginFields } from "@/utils/loginFields";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { login } from "@/actions/login";

import CardWrapper from "@/components/elements/card-wrapper";
import FormSuccess from "@/components/elements/form-success";
import FormErrors from "@/components/elements/form-error";

import * as z from "zod";

export type FormValues = z.infer<typeof LoginSchema>;

const LoginForm = () => {
  // ============ Search Params =============
  const searchParams = useSearchParams();
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email already in use with different provider!"
      : "";

  //  =========== Route ===============
  const route = useRouter();

  //  =========== State ===============
  const [success, setSuccess] = useState<string | undefined>();
  const [error, setError] = useState<string | undefined>();

  // ============ Handle URL Error ===============
  useEffect(() => {
    if (urlError) setError(urlError);
  }, [urlError]);

  // ============ Start transition ===============
  const [isPending, startTransition] = useTransition();

  // ============ Form Setup ===============
  const form = useForm<FormValues>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // ============ Form Submission ===============
  const onSubmit = (values: FormValues) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      login(values).then((data) => {
        if (data?.error) {
          if (typeof data.error === "string") {
            setError(data.error);
          } else if (typeof data.error === "object") {
            Object.entries(data.error).forEach(([field, messages]) => {
              if (messages?.length) {
                form.setError(field as keyof FormValues, {
                  type: "manual",
                  message: messages[0],
                });
              }
            });
          }
        }
        if (data?.success) setSuccess(data.success);
        if (data?.redirect) route.push(data.redirect);
      });
    });
  };

  // ============ Rendering ===============
  return (
    <CardWrapper
      headerLabel="Welcome Back!"
      backBtnHref="/auth/register"
      backBtnLabel="Don't have an account?"
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {LoginFields.map((field) => (
            <FormField
              key={field.name}
              control={form.control}
              name={field.name}
              render={({ field: controller }) => (
                <FormItem>
                  <FormLabel>{field.label}</FormLabel>
                  <FormControl>
                    <Input
                      {...controller}
                      type={field.type}
                      placeholder={field.placeholder}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}

          {error && <FormErrors message={error} />}
          {success && <FormSuccess message={success} />}

          <Button disabled={isPending} type="submit" className="w-full">
            Login
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default LoginForm;
