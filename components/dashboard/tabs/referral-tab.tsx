"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function ReferralTab() {
  const [merchantName, setMerchantName] = useState("");
  const [referralCode, setReferralCode] = useState("");

  const generateReferralCode = () => {
    if (merchantName) {
      const code = `REF-${merchantName.substring(0, 3).toUpperCase()}-${Math.random()
        .toString(36)
        .substring(2, 8)
        .toUpperCase()}`;
      setReferralCode(code);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Generate Referral Code</h2>
      <Card>
        <CardContent className="p-6">
          <Input
            type="text"
            placeholder="Enter Merchant Name"
            value={merchantName}
            onChange={(e) => setMerchantName(e.target.value)}
            className="mb-4"
          />
          <Button onClick={generateReferralCode}>Generate Code</Button>
          {referralCode && (
            <div className="mt-4 text-xl font-bold text-blue-600">
              {referralCode}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}