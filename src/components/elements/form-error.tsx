import { TriangleAlert } from "lucide-react";

const FormErrors = ({ message }: { message: string }) => {
  return (
    <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive">
      <TriangleAlert />
      <p>{message}</p>
    </div>
  );
};

export default FormErrors;
