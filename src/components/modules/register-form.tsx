"use client";

import { FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Form, FormField, FormItem } from "@/components/ui/form";
import { useState, useTransition } from "react";
import { RegisterSchema } from "@/schema";
import { RegisterFields } from "@/utils/registerFields";
import { zodResolver } from "@hookform/resolvers/zod";
import { register } from "@/actions/register";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import CardWrapper from "@/components/elements/card-wrapper";
import FormSuccess from "@/components/elements/form-success";
import FormErrors from "@/components/elements/form-error";

import * as z from "zod";

export type FormValues = z.infer<typeof RegisterSchema>;

const RegisterForm = () => {
  // ============ State ===============
  const [success, setSuccess] = useState<string | undefined>();
  const [error, setError] = useState<string | undefined>();

  // ============ Start transition ===============
  const [isPending, startTransition] = useTransition();

  // ============ Form Setup ===============
  const form = useForm<FormValues>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // ============ Form Submission ===============
  const onSubmit = (values: FormValues) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      register(values).then((data) => {
        setError("");
        setSuccess("");
        if ("success" in data) {
          setSuccess(data.success);
          return;
        }
        if ("error" in data) {
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
      });
    });
  };

  // ============ Rendering ===============
  return (
    <CardWrapper
      headerLabel="Create an Account"
      backBtnHref="/auth/login"
      backBtnLabel="Already have an account?"
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {RegisterFields.map((field) => (
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

          <Button type="submit" disabled={isPending} className="w-full">
            Register
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default RegisterForm;
