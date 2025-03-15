"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Home,
  Trophy,
  Settings,
  History,
  BarChart,
  Zap,
  Compass,
  Lightbulb,
  Users,
  GraduationCap,
} from "lucide-react";

const navItems = [
  { href: "/", label: "Dashboard", icon: Home },
  { href: "/learn", label: "Learning Hub", icon: Compass },
  { href: "/quizzes", label: "Quizzes", icon: Zap },
  { href: "/exams", label: "Exams", icon: GraduationCap },
  { href: "/leaderboard", label: "Leaderboard", icon: Trophy },
  { href: "/history", label: "Quiz History", icon: History },
  { href: "/analytics", label: "Analytics", icon: BarChart },
  { href: "/community", label: "Community", icon: Users },
  { href: "/resources", label: "Resources", icon: Lightbulb },
  { href: "/settings", label: "Settings", icon: Settings },
];

export default function LeftNav() {
  const pathname = usePathname();

  return (
    <ScrollArea className="h-[calc(100vh-4rem)] py-6 hidden md:block">
      <nav className="space-y-1 px-2">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href} className="block">
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start text-left font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                pathname === item.href
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:text-primary",
                "py-2",
              )}
            >
              <item.icon className="mr-3 h-5 w-5" />
              <span>{item.label}</span>
            </Button>
          </Link>
        ))}
      </nav>
    </ScrollArea>
  );
}
