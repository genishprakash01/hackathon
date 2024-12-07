"use client";

import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useEffect, useState } from "react";

export function UserNav() {
  const router = useRouter();
  const [partnerName, setPartnerName] = useState("");
  const [partnerId, setPartnerId] = useState("");

  useEffect(() => {
    const storedPartnerName = localStorage.getItem("partnerName") || "";
    const storedPartnerId = localStorage.getItem("partnerId") || "";
    setPartnerName(storedPartnerName);
    setPartnerId(storedPartnerId);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("partnerName");
    localStorage.removeItem("partnerId");
    
    router.push("/auth/login");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-12 w-12 rounded-full">
          <Avatar className="h-12 w-12">
            <AvatarFallback className="text-xl">{partnerName.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{partnerName}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {partnerId}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
