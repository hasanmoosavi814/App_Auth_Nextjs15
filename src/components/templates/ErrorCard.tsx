import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import CardWrapper from "../elements/card-wrapper";

const ErrorCard = () => {
  return (
    <CardWrapper
      headerLabel="Oops! Something went wrong!"
      backBtnHref="/auth/login"
      backBtnLabel="Back to Login"
    >
      <div className="w-full flex flex-col items-center text-center space-y-4">
        <ExclamationTriangleIcon className="w-10 h-10 text-destructive" />
        <p className="text-sm text-muted-foreground">
          We couldn&apos;t process your request. Please try again later.
        </p>
      </div>
    </CardWrapper>
  );
};

export default ErrorCard;
