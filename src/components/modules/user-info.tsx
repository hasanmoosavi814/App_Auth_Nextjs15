import { Card, CardContent, CardHeader } from "../ui/card";
import type { Session } from "next-auth";
import { Badge } from "../ui/badge";

import InfoRow from "../elements/InfoRow";

interface UserInfoProps {
  user?: Session["user"];
  label: string;
}

const UserInfo = ({ user, label }: UserInfoProps) => {
  return (
    <Card className="w-full max-w-4xl mx-auto mt-8 rounded-xl shadow-lg bg-secondary/80 backdrop-blur-md">
      <CardHeader>
        <h2 className="text-2xl font-bold text-center">{label}</h2>
      </CardHeader>
      <CardContent className="space-y-4">
        <InfoRow label="User ID" value={user?.id} />
        <InfoRow label="Name" value={user?.name} />
        <InfoRow label="Email" value={user?.email} />
        <InfoRow label="Role" value={user?.role} />
        <InfoRow
          label="Two-Factor Authentication"
          value={
            <Badge
              variant={user?.isTwoFactorEnabled ? "success" : "destructive"}
            >
              {user?.isTwoFactorEnabled ? "ON" : "OFF"}
            </Badge>
          }
        />
      </CardContent>
    </Card>
  );
};

export default UserInfo;
