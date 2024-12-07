import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { capitalizeFirstLetter } from "@/lib/utils";

interface Invoice {
  id: string;
  status: string;
  amount: string;
  due_date: string;
  created_date: string;
  last_reminder_date: string;
}

const InvoiceComponent = ({ merchantId }: { merchantId: string }) => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const columnHelper = createColumnHelper<Invoice>();

  const columns = [
    columnHelper.accessor("id", {
      header: "Invoice ID",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("status", {
      header: "Status",
      cell: (info) => (
        <span
          className={`px-2 py-1 rounded-full text-sm ${
            info.getValue() === "paid"
              ? "bg-green-100 text-green-800"
              : info.getValue() === "Pending"
              ? "bg-yellow-100 text-yellow-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {capitalizeFirstLetter(info.getValue())}
        </span>
      ),
    }),
    columnHelper.accessor("amount", {
      header: "Amount",
      cell: (info) => `₹${info.getValue()}`,
    }),
    columnHelper.accessor("due_date", {
      header: "Due Date",
      cell: (info) => {
        const date = info.getValue();
        console.log(date);
        return date ? new Date(date).toLocaleDateString() : "-";
      },
    }),
    columnHelper.accessor("created_date", {
      header: "Created Date",
      cell: (info) => {
        const date = info.getValue();
        return date ? new Date(date).toLocaleDateString() : "-";
      },
    }),
    columnHelper.accessor("last_reminder_date", {
      header: "Last Reminder",
      cell: (info) => {
        const date = info.getValue();
        return date ? new Date(date).toLocaleDateString() : "-";
      },
    }),
  ];

  const table = useReactTable({
    data: invoices,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `https://api.shopflo.co/flo-settlement/api/v1/partners/16210703270/merchants/${merchantId}/inovoices`,
          {
            headers: {
              "Content-Type": "application/json",
              "X-Shopflo-Version": "latest",
            },
          }
        );
        console.log(response.data.data);
        setInvoices(response.data.data);
      } catch (error) {
        console.error("Error fetching invoices:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (merchantId) {
      fetchInvoices();
    }
  }, [merchantId]);

  if (isLoading || invoices.length === 0) {
    return (
      <div className="flex flex-col gap-4 py-3">
        {[...Array(5)].map((_, index) => (
          <div key={index}>
            <Skeleton height={30} width={1400} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InvoiceComponent;
