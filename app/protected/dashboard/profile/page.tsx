import { ProfileForm } from "@/components/dashboard/profile-form";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const supabase = await createClient();
  let profile;

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    const { data: profileResult } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    profile = profileResult;
  }

  if (!user) {
    redirect("/signin");
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Profile</h3>
        <p className="text-sm text-muted-foreground">
          This information will be displayed on your public portfolio.
        </p>
      </div>
      <ProfileForm profile={profile} />
    </div>
  );
}
