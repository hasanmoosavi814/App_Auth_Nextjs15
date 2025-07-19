"use client";

import { useCurrentUser } from "@/hooks/use-current-user";

import UserInfo from "@/components/elements/user-info";

const ClientPage = () => {
  const user = useCurrentUser();

  return <UserInfo user={user} label="⚡ Client Component" />;
};

export default ClientPage;
