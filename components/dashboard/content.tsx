"use client";

import { TabType } from "@/types/dashboard";
import { HomeTab } from "@/components/dashboard/tabs/home-tab";
import { MerchantsTab } from "@/components/dashboard/tabs/merchants-tab";
import { ReferralTab } from "@/components/dashboard/tabs/referral-tab";

interface DashboardContentProps {
  activeTab: TabType;
}

export function DashboardContent({ activeTab }: DashboardContentProps) {
  return (
    <main className="flex-1 p-8">
      {activeTab === "home" && <HomeTab />}
      {activeTab === "merchants" && <MerchantsTab />}
      {activeTab === "referral" && <ReferralTab />}
      {/* Add other tabs as needed */}
    </main>
  );
}