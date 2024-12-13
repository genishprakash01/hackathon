"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity } from "@/components/dashboard/activity";
import { usePartnerContext } from "@/context/PartnerProvider";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Store, DollarSign, Wallet } from "lucide-react";
import GenericDialog from "@/components/common/GenericDialog";
import AddMerchant from "@/components/common/AddMerchant";
import IntegrationGuide from "@/components/common/IntegrationGuide";

export function HomeTab() {
  const {
    getters: { partnerData, totalCommissions, invoices },
    actions: { setActiveTab },
  } = usePartnerContext();
  const [totalMerchants, setTotalMerchants] = useState(0);
  const [isAddMerchantDialogOpen, setIsAddMerchantDialogOpen] = useState(false);
  useEffect(() => {
    setTotalMerchants(partnerData.length);
  }, [partnerData]);
  let sum = 0;
  if (invoices) {
    sum = Object.values(invoices).reduce((acc: number, curr: any) => {
      console.log("Current invoice sum:", curr);
      return acc + curr.invoiced_sum;
    }, 0);
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold mb-4">Overview</h2>
        <Button
          variant="outline"
          onClick={() => setIsAddMerchantDialogOpen(true)}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Merchant
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          className="bg-white rounded-lg shadow p-6 transition-transform duration-300 hover:scale-105 cursor-pointer"
          onClick={() => setActiveTab("merchants")}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Total Merchants</p>
              <h3 className="text-2xl font-bold">{partnerData.length}</h3>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <Store className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 transition-transform duration-300 hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Total Revenue</p>
              <h3 className="text-2xl font-bold">
                ₹
                {sum.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </h3>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 transition-transform duration-300 hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Pending Commissions</p>
              <h3 className="text-2xl font-bold">
                ₹
                {(totalCommissions ).toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </h3>
            </div>
            <div className="bg-orange-100 p-3 rounded-full">
              <Wallet className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full ">
        <IntegrationGuide />
      </div>
      {/* <Activity /> */}
      
      <GenericDialog
        isOpen={isAddMerchantDialogOpen}
        width={560}
        handleClose={() => {
          setIsAddMerchantDialogOpen(false);
        }}
        jobButtonText={'Submit'}
        closeButtonText='Cancel'
        content={<AddMerchant />}
        title="Add Merchant"
      />
    </div>
  );
}
