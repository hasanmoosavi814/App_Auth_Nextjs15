import { NewPasswordSchema } from "@/schema";
import * as z from "zod";

export const newPasswordFields: {
  name: keyof z.infer<typeof NewPasswordSchema>;
  label: string;
  type: React.HTMLInputTypeAttribute;
  placeholder: string;
}[] = [
  {
    name: "password",
    label: "New Password",
    type: "password",
    placeholder: "***********",
  },
];
