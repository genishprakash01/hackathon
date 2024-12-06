"use client";

import { UserNav } from "@/components/dashboard/user-nav";

export function DashboardHeader() {
  return (
    <header className="border-b bg-white">
      <div className="flex h-16 items-center px-4">
        <div className="ml-auto flex items-center space-x-4">
          <UserNav />
        </div>
      </div>
    </header>
  );
}