import { redirect } from "next/navigation";
import { SkillsForm } from "@/components/dashboard/skills-form";
import { createClient } from "@/utils/supabase/client";

export default async function SkillsPage() {
  const supabase = createClient();

  const fetchUser = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        redirect("/signin");
      }
      return user;
    } catch (error: any) {
      console.error("Error fetching user:", error);
      redirect("/signin");
    }
  };

  const user = await fetchUser();

  const { data: skills } = await supabase
    .from("skills")
    .select("*")
    .eq("user_id", user.id)
    .order("name", { ascending: true });

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Skills</h3>
        <p className="text-sm text-muted-foreground">
          Add and manage your technical skills and proficiency levels.
        </p>
      </div>
      <SkillsForm initialSkills={skills || []} />
    </div>
  );
}
