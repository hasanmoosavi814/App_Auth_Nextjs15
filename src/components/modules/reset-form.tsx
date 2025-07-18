"use client";

import { FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Form, FormField, FormItem } from "@/components/ui/form";
import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ResetSchema } from "@/schema";
import { resetFields } from "@/utils/resetFields";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { reset } from "@/actions/reset";

import CardWrapper from "@/components/elements/card-wrapper";
import FormSuccess from "@/components/elements/form-success";
import FormErrors from "@/components/elements/form-error";

import * as z from "zod";

export type FormValues = z.infer<typeof ResetSchema>;

const ResetForm = () => {
  //  =========== State ===============
  const [success, setSuccess] = useState<string | undefined>();
  const [error, setError] = useState<string | undefined>();

  // ============ Start transition ===============
  const [isPending, startTransition] = useTransition();

  // ============ Form Setup ===============
  const form = useForm<FormValues>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: "",
    },
  });

  // ============ Form Submission ===============
  const onSubmit = (values: FormValues) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      reset(values).then((data) => {
        if ("error" in data) {
          if (typeof data.error === "string") {
            setError(data.error);
          } else if (typeof data.error === "object") {
            Object.entries(data.error).forEach(([field, messages]) => {
              if (Array.isArray(messages) && messages.length) {
                form.setError(field as keyof FormValues, {
                  type: "manual",
                  message: messages[0],
                });
              }
            });
          }
        }

        if ("success" in data) {
          setSuccess(data.success);
        }
      });
    });
  };

  // ============ Rendering ===============
  return (
    <CardWrapper
      headerLabel="Forgot Your Password?"
      backBtnHref="/auth/login"
      backBtnLabel="Back to Login"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {resetFields.map((field) => (
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
            Send Reset Email
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default ResetForm;
