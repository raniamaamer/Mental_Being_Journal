"use client";

import { Button } from "@/components/ui/button";
import { Brain, LayoutDashboard, BookOpen, History, TrendingUp, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";

interface NavigationProps {
  user?: { name: string; email: string };
}

export function Navigation({ user }: NavigationProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/logout', { method: 'POST' });
      if (response.ok) {
        toast.success("Logged out successfully");
        router.push('/login');
      } else {
        toast.error("Logout failed");
      }
    } catch (error) {
      toast.error("An error occurred during logout");
    }
  };

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/dashboard" className="flex items-center gap-3 cursor-pointer">
            <Brain className="w-8 h-8 text-blue-600" />
            <span className="text-blue-600 font-bold text-lg">MindWell Journal</span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            <Link href="/dashboard">
              <Button
                variant={isActive("/dashboard") ? "default" : "ghost"}
                className={isActive("/dashboard") ? "bg-blue-600 hover:bg-blue-700" : ""}
              >
                <LayoutDashboard className="w-4 h-4 mr-2" />
                Dashboard
              </Button>
            </Link>
            <Link href="/journal">
              <Button
                variant={isActive("/journal") ? "default" : "ghost"}
                className={isActive("/journal") ? "bg-blue-600 hover:bg-blue-700" : ""}
              >
                <BookOpen className="w-4 h-4 mr-2" />
                Journal
              </Button>
            </Link>
            <Link href="/history">
              <Button
                variant={isActive("/history") ? "default" : "ghost"}
                className={isActive("/history") ? "bg-blue-600 hover:bg-blue-700" : ""}
              >
                <History className="w-4 h-4 mr-2" />
                History
              </Button>
            </Link>
            <Link href="/insights">
              <Button
                variant={isActive("/insights") ? "default" : "ghost"}
                className={isActive("/insights") ? "bg-blue-600 hover:bg-blue-700" : ""}
              >
                <TrendingUp className="w-4 h-4 mr-2" />
                Insights
              </Button>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            {user && (
              <span className="hidden sm:block text-gray-600 font-medium">
                {user.name}
              </span>
            )}
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden pb-3 flex gap-1 overflow-x-auto">
          <Link href="/dashboard">
            <Button
              variant={isActive("/dashboard") ? "default" : "ghost"}
              size="sm"
              className={isActive("/dashboard") ? "bg-blue-600 hover:bg-blue-700" : ""}
            >
              <LayoutDashboard className="w-4 h-4" />
            </Button>
          </Link>
          <Link href="/journal">
            <Button
              variant={isActive("/journal") ? "default" : "ghost"}
              size="sm"
              className={isActive("/journal") ? "bg-blue-600 hover:bg-blue-700" : ""}
            >
              <BookOpen className="w-4 h-4" />
            </Button>
          </Link>
          <Link href="/history">
            <Button
              variant={isActive("/history") ? "default" : "ghost"}
              size="sm"
              className={isActive("/history") ? "bg-blue-600 hover:bg-blue-700" : ""}
            >
              <History className="w-4 h-4" />
            </Button>
          </Link>
          <Link href="/insights">
            <Button
              variant={isActive("/insights") ? "default" : "ghost"}
              size="sm"
              className={isActive("/insights") ? "bg-blue-600 hover:bg-blue-700" : ""}
            >
              <TrendingUp className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}