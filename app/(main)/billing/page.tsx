"use client";
import React from "react";
import { Button } from "@/components/ui/button";

export default function BillingPage() {
  // Mock data for demo purposes
  const mockBillingDetails = [
    {
      id: "1",
      amount: 100,
      description: "Monthly subscription fee",
      timestamp: "2025-04-01T10:00:00Z",
      status: "Paid",
    },
    {
      id: "2",
      amount: 50,
      description: "Additional usage fee",
      timestamp: "2025-03-15T14:30:00Z",
      status: "Pending",
    },
    {
      id: "3",
      amount: 200,
      description: "Annual subscription fee",
      timestamp: "2025-02-01T09:00:00Z",
      status: "Paid",
    },
  ];

  return (
    <div className="p-5 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-5">Demo: Billing Details</h2>

      {mockBillingDetails.length === 0 ? (
        <div className="text-center text-gray-500">
          <p>No billing records found.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded-lg shadow-md">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">ID</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Amount</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Description</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Date</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Status</th>
              </tr>
            </thead>
            <tbody>
              {mockBillingDetails.map((billing, index) => (
                <tr key={index} className="border-t">
                  <td className="px-4 py-2 text-sm text-gray-700">{billing.id}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">${billing.amount}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{billing.description}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">
                    {new Date(billing.timestamp).toLocaleDateString()}
                  </td>
                  <td
                    className={`px-4 py-2 text-sm font-medium ${
                      billing.status === "Paid" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {billing.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-5 flex justify-end">
        <Button className="bg-blue-600 text-white hover:bg-blue-500">
          Add Payment Method
        </Button>
      </div>
    </div>
  );
}