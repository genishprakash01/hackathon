'use client';

import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoaderProps {
  isLoading: boolean;
  className?: string;
}

export function Loader({ isLoading, className }: LoaderProps) {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className={cn("animate-spin", className)}>
        <Loader2 className="h-8 w-8 text-primary" />
      </div>
    </div>
  );
}