"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { User } from "lucide-react";

export function Activity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <User className="h-5 w-5 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="font-semibold">New Merchant Registered</p>
                <p className="text-sm text-gray-500">
                  Tech Store joined the platform
                </p>
              </div>
            </div>
            <span className="text-sm text-gray-500">2 minutes ago</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}