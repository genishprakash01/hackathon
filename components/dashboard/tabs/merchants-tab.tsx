import { useState, useEffect } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import type { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { api } from "@/apiClient/apiRequests";
import type { ApiResponse } from "@/apiClient/apiRequests";
import { usePartnerContext } from "@/context/PartnerProvider";
import axios from "axios";
import { Plus } from "lucide-react";
import InvoiceComponent from "@/components/common/InvoiceComponent";

// Update the Merchant type to match API response
type Merchant = {
  merchant_id: string;
  merchant_name: string;
  status: string;
  create_date: number;
  last_activity_date: number;
};

// Add new type for component state
type ViewMode = "merchants" | "invoices";

// Update columns definition to match new data structure
const columns: ColumnDef<Merchant>[] = [
  {
    accessorKey: "merchant_name",
    header: "Merchant Name",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <Badge>{row.original.status}</Badge>,
  },
  {
    accessorKey: "create_date",
    header: "Created",
    cell: ({ row }) => new Date(row.original.create_date).toLocaleDateString(),
  },
  {
    accessorKey: "last_activity_date",
    header: "Last Active",
    cell: ({ row }) =>
      new Date(row.original.last_activity_date).toLocaleDateString(),
  },
];

export function MerchantsTab() {
  const [data, setData] = useState<any>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const {
    getters: { partnerData },
  } = usePartnerContext();
  const [viewMode, setViewMode] = useState<ViewMode>("merchants");
  const [selectedMerchant, setSelectedMerchant] = useState<Merchant | null>(
    null
  );

  useEffect(() => {
    setData(partnerData);
    setTotalCount(partnerData.length);
  }, [partnerData]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    pageCount: Math.ceil(totalCount / 10),
    manualPagination: true,
    onPaginationChange: (updater) => {
      if (typeof updater === "function") {
        const newState = updater(table.getState().pagination);
      }
    },
    initialState: {
      pagination: {
        pageSize: 10,
        pageIndex: 0,
      },
    },
  });

  const handleMerchantSelect = (merchant: Merchant) => {
    setSelectedMerchant(merchant);
    setViewMode("invoices");
  };

  // Add back button handler
  const handleBack = () => {
    setViewMode("merchants");
    setSelectedMerchant(null);
  };

  // Initial load

  return (
    <div>
      {viewMode === "merchants" ? (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold mb-4">Merchants</h2>
            <Button variant="outline">
              <Plus className="mr-2 h-4 w-4" />
              Add Merchant
            </Button>
          </div>

          <Card>
            <CardContent className="p-6">
              {/* ... search input ... */}
              <Table>
                <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <TableHead key={header.id}>
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                        </TableHead>
                      ))}
                    </TableRow>
                  ))}
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    <TableRow>
                      <TableCell
                        colSpan={columns.length}
                        className="text-center"
                      >
                        Loading...
                      </TableCell>
                    </TableRow>
                  ) : (
                    table.getRowModel().rows.map((row) => (
                      <TableRow
                        key={row.id}
                        onClick={() => handleMerchantSelect(row.original)}
                      >
                        {row.getVisibleCells().map((cell) => (
                          <TableCell key={cell.id}>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>

              {/* Pagination Controls */}
              <div className="flex items-center justify-end space-x-2 py-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                >
                  Previous
                </Button>
                <div className="flex items-center gap-1">
                  <span className="text-sm font-medium">
                    Page {table.getState().pagination.pageIndex + 1} of{" "}
                    {table.getPageCount()}
                  </span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                >
                  Next
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div>
          <div className="flex items-center mb-4">
            <Button variant="ghost" onClick={handleBack} className="mr-2">
              ← Back to Merchants
            </Button>
            <h2 className="text-2xl font-bold">
              Invoices for {selectedMerchant?.merchant_name}
            </h2>
          </div>
          {/* Add your Invoices component here */}
          <InvoiceComponent merchantId={selectedMerchant?.merchant_id || ""} />
        </div>
      )}
    </div>
  );
}
