"use client";

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@/components/ui/breadcrumb";

interface Merchant {
  id: string;
  name: string;
  email?: string;
  address?: string;
  phone?: string;
}

export default function MerchantDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [merchant, setMerchant] = useState<Merchant | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetchMerchantData();
    }
  }, [id]);

  const fetchMerchantData = async () => {
    try {
      const response = await fetch(`/api/merchants/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setMerchant(data);
      setError(null);
    } catch (error) {
      console.error('Error fetching merchant:', error);
      setError('Failed to load merchant details');
      setMerchant(null);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center p-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 p-4">{error}</div>;
  }

  if (!merchant) {
    return <div className="p-4">Merchant not found</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <Breadcrumb className="mb-6">
        <BreadcrumbItem>
          <BreadcrumbLink href="/merchants">Merchants</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink>{merchant.name}</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>

      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">{merchant.name}</h1>
        <div className="bg-white rounded-lg shadow p-6 space-y-4">
          {merchant.email && (
            <p><span className="font-semibold">Email:</span> {merchant.email}</p>
          )}
          {merchant.address && (
            <p><span className="font-semibold">Address:</span> {merchant.address}</p>
          )}
          {merchant.phone && (
            <p><span className="font-semibold">Phone:</span> {merchant.phone}</p>
          )}
        </div>
      </div>
    </div>
  );
}    