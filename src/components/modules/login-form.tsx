"use client";

import { FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Form, FormControl, FormField } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/schema";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import CardWrapper from "@/components/elements/card-wrapper";
import FormSuccess from "@/components/elements/form-success";
import FormErrors from "@/components/elements/form-error";
import * as z from "zod";

const LoginForm = () => {
  // ============ Form Setup ===============
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    console.log("Login submitted:", values);
    // TODO: Handle login logic here (e.g., API call)
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
          {/* Email Field */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="example@domain.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password Field */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="••••••••" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* <FormErrors message="something went wrong" />
          <FormSuccess message="something went wrong" /> */}
          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default LoginForm;
