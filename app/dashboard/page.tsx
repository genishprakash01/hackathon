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
  const { actions: { setPartnerData, setTotalCommissions } } = usePartnerContext();
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const fetchMerchants = async () => {
    setIsLoading(true);
    try {
      const [merchantsResponse, settlementResponse] = await Promise.all([
        axios.get(
          `https://api.shopflo.co/flo-settlement/api/v1/partners/16210703270/merchants`,
          {
            headers: {
              "x-shopflo-version": "latest",
            },
          }
        ),
        axios.get(
          `https://api.shopflo.co/flo-settlement/api/v1/partners/16210703270/settlement`,
          {
            headers: {
              "x-shopflo-version": "latest",
            },
          }
        ),
      ]);
      console.log(settlementResponse);

      setPartnerData(merchantsResponse.data.data);
      setTotalCount(merchantsResponse.data.data.length);
      setTotalCommissions(settlementResponse.data.data.total);
      // Handle settlement data as needed
      // You might want to add a new state variable for settlement data
    } catch (error) {
      console.error("Failed to fetch data:", error);
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