import React, { useState } from 'react'

const AddMerchant = () => {
  const [formData, setFormData] = useState({
    dealname: '',
    amount: '',
    website_url: '',
    collab_access_code: '',
    add_on: {
      Upsell: false,
      Cart: false,
      Rewards: false
    },
    tier: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    setFormData(prev => ({
      ...prev,
      add_on: {
        ...prev.add_on,
        [name]: checked
      }
    }))
  }

  return (
    <div className="p-4">
      <form className="space-y-4">
        <div>
          <label className="block mb-1">Deal Name</label>
          <input
            type="text"
            name="dealname"
            value={formData.dealname}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />
        </div>

        <div>
          <label className="block mb-1">Amount</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />
        </div>

        <div>
          <label className="block mb-1">Website URL</label>
          <input
            type="url"
            name="website_url"
            value={formData.website_url}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />
        </div>

        <div>
          <label className="block mb-1">Collab Access Code</label>
          <input
            type="text"
            name="collab_access_code"
            value={formData.collab_access_code}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />
        </div>

        <div>
          <label className="block mb-1">Add-ons</label>
          <div className="space-x-4">
            {Object.keys(formData.add_on).map(addon => (
              <label key={addon} className="inline-flex items-center">
                <input
                  type="checkbox"
                  name={addon}
                  checked={formData.add_on[addon as keyof typeof formData.add_on]}
                  onChange={handleCheckboxChange}
                  className="mr-2"
                />
                {addon}
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block mb-1">Tier</label>
          <select
            name="tier"
            value={formData.tier}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          >
            <option value="">Select Tier</option>
            <option value="Tier 1 (Startup)">Tier 1 (Startup)</option>
            <option value="Tier 2">Tier 2</option>
            <option value="Tier 3">Tier 3</option>
          </select>
        </div>
      </form>
    </div>
  )
}

export default AddMerchant