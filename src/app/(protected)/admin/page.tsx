"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { RoleGate } from "@/components/modules/role-gate";
import { UserRole } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { admin } from "@/actions/admin";

import FormSuccess from "@/components/elements/form-success";

const AdminPage = () => {
  // ========== Action ==============
  const onServerActionClick = () => {
    admin().then((data) => {
      if (data.error) toast.error(data.error);
      if (data.success) toast.success(data.success);
    });
  };

  // ========== Handler ==============
  const onApiRouteClick = () => {
    fetch("/api/admin").then((response) => {
      if (response.ok) toast.success("Allowed API Route!");
      else toast.error("Forbiden API Route!");
    });
  };

  // ========== Rendering ==============
  return (
    <Card className="w-full max-w-4xl mx-auto mt-10 rounded-2xl bg-secondary/80 backdrop-blur-md shadow-xl">
      <CardHeader className="text-center space-y-2">
        <h2 className="text-3xl font-bold">🛡️ Admin Panel</h2>
        <p className="text-muted-foreground text-sm">
          Manage privileged actions and access admin-exclusive features
        </p>
      </CardHeader>

      <CardContent className="space-y-6">
        <RoleGate allowedRole={UserRole.ADMIN}>
          <FormSuccess message="✅ You are allowed to see this content!" />
        </RoleGate>

        <div className="flex items-center justify-between border p-4 rounded-lg shadow-sm bg-background">
          <p className="text-sm font-medium text-center">
            🔐 Admin-Only API Route
          </p>
          <Button onClick={onApiRouteClick} className="w-full sm:w-auto">
            Trigger API Call
          </Button>
        </div>

        <div className="flex items-center justify-between border p-4 rounded-lg shadow-sm bg-background">
          <p className="text-sm font-medium">⚙️ Admin-Only Server Action</p>
          <Button onClick={onServerActionClick} className="sm:w-auto">
            Execute Action
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminPage;
