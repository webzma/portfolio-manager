"use client";

import type React from "react";

import { use, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/utils/supabase/client";
import { redirect, useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { toast } from "sonner";

interface Skill {
  id: string;
  name: string;
  level: number;
}

export function SkillsForm({ initialSkills = [] }: { initialSkills: Skill[] }) {
  const [skills, setSkills] = useState<Skill[]>(initialSkills);
  const [newSkill, setNewSkill] = useState("");
  const [skillLevel, setSkillLevel] = useState(3);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();
  const [user, setUser] = useState<{ id: string } | null>(null);

  useEffect(() => {
    const fetchAndSetUser = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (!user) {
          redirect("/signin");
        }
        if (user) {
          setUser(user);
        }
      } catch (error: any) {
        console.error("Error fetching user:", error);
      }
    };

    fetchAndSetUser();
  }, []);

  const handleAddSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkill.trim()) return;

    setIsLoading(true);

    try {
      const { data, error } = await supabase
        .from("skills")
        .insert({
          user_id: user?.id as string,
          name: newSkill.trim(),
          level: skillLevel,
        })
        .select()
        .single();

      if (error) {
        throw error;
      }

      setSkills([...skills, data]);
      setNewSkill("");
      setSkillLevel(3);

      toast("Your skill has been added successfully.");
    } catch (error: any) {
      toast(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveSkill = async (id: string) => {
    try {
      const { error } = await supabase.from("skills").delete().eq("id", id);

      if (error) {
        throw error;
      }

      setSkills(skills.filter((skill) => skill.id !== id));

      toast("Your skill has been removed successfully.");

      router.refresh();
    } catch (error: any) {
      toast(error.message);
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleAddSkill} className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="sm:col-span-2">
            <Label htmlFor="skill-name">Skill Name</Label>
            <Input
              id="skill-name"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              placeholder="e.g. JavaScript, React, Node.js"
            />
          </div>
          <div>
            <Label htmlFor="skill-level">Level (1-5)</Label>
            <Input
              id="skill-level"
              type="number"
              min="1"
              max="5"
              value={skillLevel}
              onChange={(e) => setSkillLevel(Number.parseInt(e.target.value))}
            />
          </div>
        </div>
        <Button type="submit" disabled={isLoading || !newSkill.trim()}>
          {isLoading ? "Adding..." : "Add Skill"}
        </Button>
      </form>

      <div className="space-y-2">
        <Label>Your Skills</Label>
        {skills.length === 0 ? (
          <p className="text-sm text-muted-foreground">No skills added yet.</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <Badge
                key={skill.id}
                variant="secondary"
                className="pl-3 pr-2 py-1.5 text-sm"
              >
                {skill.name} ({skill.level}/5)
                <button
                  type="button"
                  onClick={() => handleRemoveSkill(skill.id)}
                  className="ml-1 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-3 w-3" />
                  <span className="sr-only">Remove {skill.name}</span>
                </button>
              </Badge>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
