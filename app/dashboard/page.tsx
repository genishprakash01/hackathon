"use client";

import { DashboardHeader } from "@/components/dashboard/header";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { DashboardContent } from "@/components/dashboard/content";
import { useEffect, useState } from "react";
import { TabType } from "@/types/dashboard";
import { ApiResponse, Merchant } from "@/apiClient/apiRequests";
import axios from "axios";
import { usePartnerContext } from "@/context/PartnerProvider";
import { Loader } from "@/components/ui/loader";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<TabType>("home");
  const { actions: { setPartnerData } } = usePartnerContext();
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const fetchMerchants = async () => {
    setIsLoading(true);
    try {
      const response: any = await axios.get<ApiResponse<{ data: Merchant[] }>>(
        `https://c5ef-116-66-190-58.ngrok-free.app/flo-settlement/api/v1/partners/16210703270/merchants`
      );
      setPartnerData(response.data.data);
      setTotalCount(response.data.data.length);
    } catch (error) {
      console.error("Failed to fetch merchants:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMerchants();
  }, []);
    
  return (
    <>
      <Loader isLoading={isLoading} />
      <div className="min-h-screen flex bg-gray-100">
        <DashboardSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="flex-1 flex flex-col">
          <DashboardHeader />
          <DashboardContent activeTab={activeTab} />
        </div>
      </div>
    </>
  );
}