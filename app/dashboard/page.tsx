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
  const {
    getters: { activeTab, invoices  },
    actions: { setPartnerData, setTotalCommissions, setActiveTab, setInvoices },
  } = usePartnerContext();
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [partnerId, setPartnerId] = useState<string | null>(null);

  useEffect(() => {
    setPartnerId(localStorage.getItem("partnerId"));
  }, []);

  const fetchMerchants = async () => {
    if (!partnerId) return;
    
    setIsLoading(true);
    try {
      const [merchantsResponse, settlementResponse] = await Promise.all([
        axios.get(
          `https://api.shopflo.co/flo-settlement/api/v1/partners/${partnerId}/merchants`,
          {
            headers: {
              "x-shopflo-version": "latest",
            },
          }
        ),
        axios.get(
          `https://api.shopflo.co/flo-settlement/api/v1/partners/${partnerId}/settlement`,
          {
            headers: {
              "x-shopflo-version": "latest",
            },
          }
        ),
      ]);

      setPartnerData(merchantsResponse.data.data);
      setTotalCount(merchantsResponse.data.data.length);
      setTotalCommissions(settlementResponse.data.data.total);
      setInvoices(settlementResponse.data.data.merchant_payout_details);
    } catch (error) {
      console.error("Failed to fetch data:", error);
      setPartnerData([]);
      setTotalCount(0);
      setTotalCommissions(0);
      setInvoices([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMerchants();
  }, [partnerId]);


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
