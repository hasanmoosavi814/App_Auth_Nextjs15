import { useCurrentRole } from "@/hooks/user-current-role";
import { UserRole } from "@prisma/client";

import FormErrors from "../elements/form-error";

interface RoleGateProps {
  children: React.ReactNode;
  allowedRole: UserRole;
}

export const RoleGate = ({ children, allowedRole }: RoleGateProps) => {
  const role = useCurrentRole();

  if (role !== allowedRole) {
    return (
      <FormErrors message="You do not have permission to view this content!" />
    );
  }

  return <>{children}</>;
};
