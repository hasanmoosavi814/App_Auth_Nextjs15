import { CheckCircle2 } from "lucide-react";

const FormSuccess = ({ message }: { message: string }) => {
  return (
    <div className="bg-emerald-500/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-emerald-600">
      <CheckCircle2 />
      <p>{message}</p>
    </div>
  );
};

export default FormSuccess;
