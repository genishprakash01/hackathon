"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { usePartnerContext } from "@/context/PartnerProvider";

export default function Login() {
  const {
    getters: { partnerId, partnerName },
    actions: { setPartnerId, setPartnerName, handleLogin },
  } = usePartnerContext();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Partner Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="partnerId">Partner ID</Label>
              <Input
                id="partnerId"
                type="text"
                value={partnerId}
                onChange={(e) => setPartnerId(e.target.value)}
                placeholder="Enter your Partner ID"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="partnerName">Partner Name</Label>
              <Input
                id="partnerName"
                type="text"
                value={partnerName}
                onChange={(e) => setPartnerName(e.target.value)}
                placeholder="Enter your Partner Name"
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
