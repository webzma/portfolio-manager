import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { User, FolderKanban, ExternalLink } from "lucide-react";

export default async function Dashboard() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/signin");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .eq("user_id", user.id);

  const portfolioUrl = `/portfolio/${user.id}`;

  return (
    <div className="space-y-8 w-full">
      <div className="flex items-start justify-between flex-col gap-2 md:items-center md:flex-row">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <Link href={portfolioUrl} target="_blank">
          <Button variant="outline" className="gap-2">
            <ExternalLink className="h-4 w-4" />
            View Portfolio
          </Button>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Profile Completion
            </CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {profile ? "Complete" : "Incomplete"}
            </div>
            <p className="text-xs text-muted-foreground">
              {profile ? "Your profile is set up" : "Set up your profile"}
            </p>
            <div className="mt-4">
              <Link href="/dashboard/profile">
                <Button variant="outline" size="sm">
                  {profile ? "Edit Profile" : "Complete Profile"}
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Projects</CardTitle>
            <FolderKanban className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projects?.length || 0}</div>
            <p className="text-xs text-muted-foreground">
              {projects?.length
                ? "Projects added to your portfolio"
                : "No projects added yet"}
            </p>
            <div className="mt-4">
              <Link href="/dashboard/projects">
                <Button variant="outline" size="sm">
                  Manage Projects
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
