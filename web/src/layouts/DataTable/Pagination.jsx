


import { Button } from "@/components/ui/button";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const DataTablePagination = ({ page, setPage, limit, setLimit, total }) => {
  const totalPages = Math.ceil(total / limit) || 1;

  // Compute visible item range
  const startItem = total === 0 ? 0 : (page - 1) * limit + 1;
  const endItem = Math.min(page * limit, total);

  return (
    <div className="flex flex-col lg:flex-row items-center gap-4 justify-between w-full">
      {/* Rows per page selector */}
      {/* <div className="flex items-center gap-2">
        <span className="text-sm font-medium">Rows per page:</span>
        <Select value={`${limit}`} onValueChange={(value) => setLimit(Number(value))}>
          <SelectTrigger className="w-20">
            <SelectValue placeholder={limit} />
          </SelectTrigger>
          <SelectContent side="top">
            {[10, 20, 30, 40, 50].map((size) => (
              <SelectItem key={size} value={`${size}`}>
                {size}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div> */}

      {/* Pagination controls */}
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">
          Showing {page} of {totalPages}
        </span>

        <Button
          variant="outline"
          className="h-8 w-8 hidden lg:flex bg-transparent"
          onClick={() => setPage(1)}
          disabled={page === 1}
        >
          <ChevronsLeftIcon />
        </Button>
        <Button
          variant="outline"
          className="h-8 w-8 bg-transparent"
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
        >
          <ChevronLeftIcon />
        </Button>
        <Button
          variant="outline"
          className="h-8 w-8 bg-transparent"
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          disabled={page === totalPages}
        >
          <ChevronRightIcon />
        </Button>
        <Button
          variant="outline"
          className="h-8 w-8 hidden lg:flex bg-transparent"
          onClick={() => setPage(totalPages)}
          disabled={page === totalPages}
        >
          <ChevronsRightIcon />
        </Button>
      </div>
    </div>
  );
};

