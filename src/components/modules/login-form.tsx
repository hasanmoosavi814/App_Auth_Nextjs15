"use client";

import { FormMessage, FormField, FormItem } from "@/components/ui/form";
import { useEffect, useState, useTransition } from "react";
import { FormLabel, FormControl, Form } from "@/components/ui/form";
import { useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/schema";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { login } from "@/actions/login";

import CardWrapper from "@/components/elements/card-wrapper";
import FormSuccess from "@/components/elements/form-success";
import FormErrors from "@/components/elements/form-error";
import Link from "next/link";

import * as z from "zod";

export type FormValues = z.infer<typeof LoginSchema>;

const LoginForm = () => {
  // ========== Hooks =========
  const searchParams = useSearchParams();
  const router = useRouter();
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email already in use with different provider!"
      : "";

  // ========== State =========
  const [success, setSuccess] = useState<string | undefined>();
  const [error, setError] = useState<string | undefined>();
  const [showTwoFactor, setShowTwoFactor] = useState(false);

  // ========== Form Setup =========
  const [isPending, startTransition] = useTransition();
  const form = useForm<FormValues>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
      code: "",
    },
  });

  // ========== Effects =========
  useEffect(() => {
    if (urlError) setError(urlError);
  }, [urlError]);

  // ========= Form Submission =========
  const onSubmit = (values: FormValues) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      login(values).then((data) => {
        if (data?.error) {
          setError(typeof data.error === "string" ? data.error : "");
          if (typeof data.error === "object") {
            Object.entries(data.error).forEach(([field, messages]) => {
              if (Array.isArray(messages) && messages.length) {
                form.setError(field as keyof FormValues, {
                  type: "manual",
                  message: messages[0],
                });
              }
            });
          }
          return;
        }
        if (data?.twoFactor) setShowTwoFactor(true);
        if (data?.success) setSuccess(data.success);
        if (data?.redirect) router.push(data.redirect);
      });
    });
  };

  // ========== Render =========
  return (
    <CardWrapper
      headerLabel="Welcome Back!"
      backBtnHref="/auth/register"
      backBtnLabel="Don't have an account?"
      showSocial={!showTwoFactor}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {!showTwoFactor && (
            <>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        placeholder="example@domain.com"
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        placeholder="••••••••"
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                size="sm"
                variant="link"
                asChild
                className="px-0 font-normal"
              >
                <Link href="/auth/reset">Forgot password?</Link>
              </Button>
            </>
          )}

          {showTwoFactor && (
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Two-Factor Code</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder="Enter 6-digit code"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {error && <FormErrors message={error} />}
          {success && <FormSuccess message={success} />}
          <Button disabled={isPending} type="submit" className="w-full">
            {showTwoFactor ? "Verify Code" : "Login"}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default LoginForm;
