import React, { useState } from 'react'
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material'
import { SelectChangeEvent } from '@mui/material/Select';

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

  const handleChange = (e: SelectChangeEvent | React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
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
            className="border p-2 w-full rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
          />
        </div>

        <div>
          <label className="block mb-1">Amount</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            className="border p-2 w-full rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
        </div>

        <div>
          <label className="block mb-1">Website URL</label>
          <input
            type="url"
            name="website_url"
            value={formData.website_url}
            onChange={handleChange}
            className="border p-2 w-full rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
          />
        </div>

        <div>
          <label className="block mb-1">Collab Access Code</label>
          <input
            type="text"
            name="collab_access_code"
            value={formData.collab_access_code}
            onChange={handleChange}
            className="border p-2 w-full rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
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
          <FormControl fullWidth>
            <InputLabel id="tier-label">Tier</InputLabel>
            <Select
              labelId="tier-label"
              id="tier"
              name="tier"
              value={formData.tier}
              onChange={handleChange}
              label="Tier"
              sx={{
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#22c55e',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#22c55e',
                },
                borderRadius: '0.5rem'
              }}
            >
              <MenuItem value="">
                <em>Select Tier</em>
              </MenuItem>
              <MenuItem value="Tier 1 (Startup)">Tier 1 (Startup)</MenuItem>
              <MenuItem value="Tier 2">Tier 2</MenuItem>
              <MenuItem value="Tier 3">Tier 3</MenuItem>
            </Select>
          </FormControl>
        </div>
      </form>
    </div>
  )
}

export default AddMerchant