"use client";

import { TabType } from "@/types/dashboard";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Home,
  Store,
  DollarSign,
  FileText,
} from "lucide-react";

interface DashboardSidebarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

const navItems = [
  { id: "home", icon: Home, label: "Home" },
  { id: "merchants", icon: Store, label: "Merchants" },

] as const;

export function DashboardSidebar({
  activeTab,
  setActiveTab,
}: DashboardSidebarProps) {
  return (
    <div className="w-64 bg-white shadow-lg">
      <div className="p-4">
        <h1 className="text-2xl font-bold text-blue-600">Dashboard</h1>
      </div>
      <nav className="mt-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Button
              key={item.id}
              variant="ghost"
              className={cn(
                "w-full justify-start px-4",
                activeTab === item.id
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "hover:bg-blue-50"
              )}
              onClick={() => setActiveTab(item.id)}
            >
              <Icon className="mr-3 h-5 w-5" />
              {item.label}
            </Button>
          );
        })}
      </nav>
    </div>
  );
}