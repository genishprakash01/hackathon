"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Activity } from "@/components/dashboard/activity";
import { usePartnerContext } from "@/context/PartnerProvider";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import GenericDialog from "@/components/common/GenericDialog";
import AddMerchant from "@/components/common/AddMerchant";

export function HomeTab() {
  const {
    getters: { partnerData, totalCommissions },
  } = usePartnerContext();
  const [totalMerchants, setTotalMerchants] = useState(0);
  const [isAddMerchantDialogOpen, setIsAddMerchantDialogOpen] = useState(false);
  useEffect(() => {
    setTotalMerchants(partnerData.length);
  }, [partnerData]);
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold mb-4">Overview</h2>
        <Button variant="outline" onClick={() => setIsAddMerchantDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Merchant
        </Button>
      </div>  
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Total Merchants</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-blue-600">{partnerData.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-600">$52,489</p>
            <p className="text-sm text-gray-500">↑ 8% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Total Commissions</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-orange-600">
              ₹{(totalCommissions * 0.1).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          </CardContent>
        </Card>
      </div>
      <Activity />
      <GenericDialog
        isOpen={isAddMerchantDialogOpen}
        width={560}
        handleClose={() => {
          setIsAddMerchantDialogOpen(false);
        }}
        content={<AddMerchant />}
        title="Add Merchant"
      />
    </div>
  );
}