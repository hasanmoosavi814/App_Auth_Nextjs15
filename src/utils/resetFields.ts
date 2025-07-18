import { ResetSchema } from "@/schema";
import * as z from "zod";

export const resetFields: {
  name: keyof z.infer<typeof ResetSchema>;
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
];
