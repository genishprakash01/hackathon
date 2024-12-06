"use client";

import { DashboardHeader } from "@/components/dashboard/header";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { DashboardContent } from "@/components/dashboard/content";
import { useState } from "react";
import { TabType } from "@/types/dashboard";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<TabType>("home");

  return (
    <div className="min-h-screen flex bg-gray-100">
      <DashboardSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 flex flex-col">
        <DashboardHeader />
        <DashboardContent activeTab={activeTab} />
      </div>
    </div>
  );
}