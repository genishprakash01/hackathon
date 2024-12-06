import { useState, useEffect } from "react";
// ... existing imports ...
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

// Add type for data
type Merchant = {
  name: string;
  status: string;
  revenue: string;
};

// Update type to include total count
type MerchantsResponse = {
  merchants: Merchant[];
  totalCount: number;
};

// Define columns
const columns: ColumnDef<Merchant>[] = [
  {
    accessorKey: "name",
    header: "Merchant Name",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <Badge>{row.original.status}</Badge>,
  },
  {
    accessorKey: "revenue",
    header: "Revenue",
  },
  {
    id: "actions",
    header: "Actions",
    cell: () => (
      <Button variant="ghost" className="mr-2">
        View
      </Button>
    ),
  },
];

export function MerchantsTab() {
  const [data, setData] = useState<Merchant[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // Function to fetch merchants
  const fetchMerchants = async (page: number) => {
    setIsLoading(true);
    try {
      const response = await api.get<ApiResponse<MerchantsResponse>>(
        `/merchants?page=${page + 1}&pageSize=10`
      );
      setData(response.data.merchants);
      setTotalCount(response.data.totalCount);
    } catch (error) {
      console.error("Failed to fetch merchants:", error);
    } finally {
      setIsLoading(false);
    }
  };

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
        fetchMerchants(newState.pageIndex);
      }
    },
    initialState: {
      pagination: {
        pageSize: 10,
        pageIndex: 0,
      },
    },
  });

  // Initial load
  useEffect(() => {
    fetchMerchants(0);
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Merchants</h2>
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
                  <TableCell colSpan={columns.length} className="text-center">
                    Loading...
                  </TableCell>
                </TableRow>
              ) : (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
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
  );
}
