// src/app/components/AddHomeownerForm.tsx
"use client";
import { useState } from "react";
import { states } from "@/constants/states";
import TextInput from "./TextInput";

const offerTypes = [
  "Cash Offer - Quick Close (Distressed)",
  "Highest Priced Offer - Faster Close",
  "Recommended Listing Price - Market Listing",
];

export default function AddHomeownerForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    estimatedHomeValue: "",
    desiredSaleDate: "",
    offerType: "",
    newsletterSubscribed: false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const newValue =
      e.target instanceof HTMLInputElement && e.target.type === "checkbox"
        ? e.target.checked
        : value;

    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch("/api/homeowners", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          estimatedHomeValue: Number(formData.estimatedHomeValue),
        }),
      });

      const data = await response.json();
      if (data.success) {
        setSuccess("Homeowner added successfully!");
        setFormData({
          name: "",
          email: "",
          phone: "",
          address: "",
          city: "",
          state: "",
          zipCode: "",
          estimatedHomeValue: "",
          desiredSaleDate: "",
          offerType: "",
          newsletterSubscribed: false,
        });
      } else {
        setError(data.error || "Something went wrong. Please try again.");
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <TextInput
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <div className="flex space-x-4">
        <TextInput
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          type="email"
        />
        <TextInput
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
      </div>
      <TextInput
        name="address"
        placeholder="Address"
        value={formData.address}
        onChange={handleChange}
        required
      />
      <div className="flex space-x-4">
        <TextInput
          name="city"
          placeholder="City"
          value={formData.city}
          onChange={handleChange}
          required
        />
        <select
          name="state"
          value={formData.state}
          onChange={handleChange}
          required
          className="flex-1 border rounded px-3 py-2 bg-white text-black dark:bg-gray-800 dark:text-gray-400"
        >
          <option value="" disabled>
            Select State
          </option>
          {states.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
        <TextInput
          name="zipCode"
          placeholder="Zip Code"
          value={formData.zipCode}
          onChange={handleChange}
          required
        />
      </div>
      <div className="flex space-x-4">
        <TextInput
          name="estimatedHomeValue"
          placeholder="Estimated Home Value"
          value={formData.estimatedHomeValue}
          onChange={handleChange}
          required
          type="number"
        />
        <TextInput
          name="desiredSaleDate"
          placeholder="Sale Date"
          value={formData.desiredSaleDate}
          onChange={handleChange}
          required
          type="date"
        />
      </div>
      <select
        name="offerType"
        value={formData.offerType}
        onChange={handleChange}
        required
        className="border rounded px-3 py-2 w-full bg-white text-black dark:bg-gray-800 dark:text-gray-400"
      >
        <option value="" disabled>
          Select the type of offer you would like...
        </option>
        {offerTypes.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
      <label className="flex items-center">
        <input
          type="checkbox"
          name="newsletterSubscribed"
          checked={formData.newsletterSubscribed}
          onChange={handleChange}
          className="mr-2"
        />
        Subscribe to Newsletter
      </label>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
        disabled={loading}
      >
        {loading ? "Submitting..." : "Add Homeowner"}
      </button>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
    </form>
  );
}
