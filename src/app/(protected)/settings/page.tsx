"use client";

import { useState, useTransition } from "react";
import { useSession } from "next-auth/react";
import { settings } from "@/actions/settings";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SettingsSchema } from "@/schema";
import * as z from "zod";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { useCurrentUser } from "@/hooks/use-current-user";
import { UserRole } from "@prisma/client";
import FormErrors from "@/components/elements/form-error";
import FormSuccess from "@/components/elements/form-success";

const Settings = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const { update } = useSession();
  const user = useCurrentUser();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof SettingsSchema>>({
    resolver: zodResolver(SettingsSchema),
    defaultValues: {
      password: undefined,
      newPassword: undefined,
      name: user?.name || "",
      email: user?.email || "",
      role: user?.role || UserRole.USER,
      isTwoFactorEnabled: user?.isTwoFactorEnabled || false,
    },
  });

  const onSubmit = (values: z.infer<typeof SettingsSchema>) => {
    setError(undefined);
    setSuccess(undefined);

    startTransition(() => {
      settings(values)
        .then((data) => {
          console.log(data);
          if (data?.error) setError(data.error);
          if (data?.success) {
            update();
            setSuccess(data.success);
            form.reset({
              ...values,
              password: undefined,
              newPassword: undefined,
            });
          }
        })
        .catch(() => setError("Something went wrong."));
    });
  };

  return (
    <Card className="w-full max-w-4xl mx-auto mt-8 rounded-xl shadow-lg bg-secondary/80 backdrop-blur-md">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">
          🛠️ Account Settings
        </p>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>🧑 Name</FormLabel>
                  <Input placeholder="Enter your name..." {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>📧 Email</FormLabel>
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    {...field}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>👤 Role</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={UserRole.ADMIN}>Admin</SelectItem>
                      <SelectItem value={UserRole.USER}>User</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {user?.isOAuth === false && (
              <FormField
                control={form.control}
                name="isTwoFactorEnabled"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between">
                    <FormLabel>🔐 Two-Factor Authentication</FormLabel>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormItem>
                )}
              />
            )}
            {error && <FormErrors message={error} />}
            {success && <FormSuccess message={success} />}

            <Button type="submit" disabled={isPending} className="w-full">
              {isPending ? "Updating..." : "💾 Save Settings"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default Settings;
