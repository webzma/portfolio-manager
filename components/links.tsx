"use client";

import { usePathname } from "next/navigation";

import {
  BarChart,
  Briefcase,
  Code,
  Download,
  GraduationCap,
  Home,
  Lightbulb,
  MenuIcon,
  Settings,
  User,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import Link from "next/link";

const navItems = [
  { href: "/protected/dashboard", label: "Dashboard", icon: Home },
  { href: "/protected/dashboard/profile", label: "Profile", icon: User },
  { href: "/protected/dashboard/projects", label: "Projects", icon: Code },
  { href: "/protected/dashboard/skills", label: "Skills", icon: Lightbulb },
  {
    href: "/protected/dashboard/experience",
    label: "Experience",
    icon: Briefcase,
  },
  {
    href: "/protected/dashboard/education",
    label: "Education",
    icon: GraduationCap,
  },
  {
    href: "/protected/dashboard/analytics",
    label: "Analytics",
    icon: BarChart,
  },
  { href: "/protected/dashboard/settings", label: "Settings", icon: Settings },
  { href: "/protected/dashboard/export", label: "Export", icon: Download },
];

export default function Links() {
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-6 border p-1 rounded-md ">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <MenuIcon className="h-6 w-6 text-muted-foreground" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Links</DropdownMenuLabel>
          {navItems.map((item) => (
            <DropdownMenuItem key={item.href}>
              <Link
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-primary flex items-center gap-1 ${
                  pathname === item.href
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
