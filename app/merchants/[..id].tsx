import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

interface Merchant {
  id: string;
  name: string;
  // Add other merchant properties as needed
}

export default function MerchantDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [merchant, setMerchant] = useState<Merchant | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchMerchantData();
    }
  }, [id]);

  const fetchMerchantData = async () => {
    try {
      // Replace with your actual API endpoint
      const response = await fetch(`/api/merchants/${id}`);
      const data = await response.json();
      setMerchant(data);
    } catch (error) {
      console.error('Error fetching merchant:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!merchant) {
    return <div>Merchant not found</div>;
  }

  return (
    <div className="merchant-details">
      <h1>{merchant.name}</h1>
      {/* Add more merchant details here */}
    </div>
  );
}    