import CardWrapper from "@/components/elements/card-wrapper";

const LoginForm = () => {
  return (
    <CardWrapper
      headerLabel="Welcome Back!"
      backBtnHref="/auth/register"
      backBtnLabel="Don't have an account?"
      showSocial
    >
      Form
    </CardWrapper>
  );
};

export default LoginForm;
