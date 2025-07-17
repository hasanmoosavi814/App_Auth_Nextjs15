import { FormValues } from "@/components/modules/login-form";

export const LoginFields: {
  name: keyof FormValues;
  label: string;
  type: React.HTMLInputTypeAttribute;
  placeholder: string;
}[] = [
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "example@domain.com",
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "••••••••",
  },
];
