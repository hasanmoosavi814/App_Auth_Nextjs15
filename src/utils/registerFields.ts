import { FormValues } from "@/components/modules/register-form";

export const RegisterFields: {
  name: keyof FormValues;
  label: string;
  type: React.HTMLInputTypeAttribute;
  placeholder: string;
}[] = [
  {
    name: "name",
    label: "Name",
    type: "text",
    placeholder: "John Doe",
  },
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
  {
    name: "confirmPassword",
    label: "Confirm Password",
    type: "password",
    placeholder: "••••••••",
  },
];
