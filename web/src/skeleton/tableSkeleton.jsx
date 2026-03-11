


import { Skeleton } from "@/components/ui/skeleton";

const TableSkeleton = ({ columns, rows = 10, isLoading = false } ) => {
  return (
    <div className="overflow-auto bg-background text-foreground rounded-lg border border-[#E8EDF7]">
      <table className="min-w-[1400px] w-full table-auto">
               <tbody>
          {[...Array(rows)].map((_, rowIndex) => (
            <tr key={rowIndex} className="odd:bg-background even:bg-background">
              {columns.map((_, colIndex) => (
                <td key={colIndex} className="p-2">
                  <Skeleton className="h-4 w-full rounded-sm" />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableSkeleton;



export const PdfSkeleton = ({ count = 6 }) => {
  return (
    <div className="flex flex-wrap gap-4 mt-6 p-2">
      {[...Array(count)].map((_, i) => (
        <div
          key={i}
          className="flex items-center justify-between shadow rounded-xl p-3 w-[300px] border bg-section-background"
        >
          <div className="flex items-center gap-3 flex-1">
            <Skeleton className="w-8 h-8 rounded-md" />
            <div className="flex flex-col gap-2 w-full">
              <Skeleton className="h-4 w-3/4 rounded-sm" />
              <Skeleton className="h-3 w-1/2 rounded-sm" />
            </div>
          </div>
          <Skeleton className="w-5 h-5 rounded-full" />
        </div>
      ))}
    </div>
  );
};


  export const BannerSkeleton = ({ count = 2 }) => {
    return (
      <div className="flex flex-wrap gap-4 mt-6 p-2">
        {[...Array(count)].map((_, i) => (
          <div
            key={i}
            className="shadow rounded-xl p-3 w-[300px] border bg-section-background animate-pulse"
          >
            <div className="flex flex-col items-center gap-2">
              {/* Image placeholder */}
              <Skeleton className="h-20 w-full rounded-md" />

              {/* Title placeholder */}
              <Skeleton className="h-5 w-3/4 rounded-sm" />

              {/* User type placeholder */}
              <Skeleton className="h-4 w-1/2 rounded-sm" />

              {/* Buttons placeholder */}
              <div className="flex justify-center gap-3 mt-3 w-full">
                <Skeleton className="h-8 w-20 rounded-md" />
                <Skeleton className="h-8 w-20 rounded-md" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };



export const AboutUsSkeleton = () => {
  return (
    <div className="p-6">
      <div className="bg-section-background rounded-lg shadow-md p-6 animate-pulse">
        {/* Header */}
        <Skeleton className="h-6 w-1/3 rounded-sm mb-6" />

        <div className="flex flex-col md:flex-row gap-6">
          {/* Logo Skeleton */}
          <div className="flex flex-col items-center gap-2">
            <Skeleton className="h-32 w-32 rounded-full" />
            <Skeleton className="h-6 w-20 rounded-md" /> {/* Remove button placeholder */}
          </div>

          {/* Description Skeleton */}
          <div className="flex-1 space-y-2">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-6 w-full rounded-sm" />
            ))}
          </div>
        </div>

        {/* Update Button Skeleton */}
        <div className="flex justify-end mt-12">
          <Skeleton className="h-10 w-32 rounded-md" />
        </div>
      </div>
    </div>
  );
};





// const Skeleton = ({ className }) => <div className={`bg-gray-300 rounded ${className}`} />;

export const FaqSkeleton = ({ count = 5 }) => {
  return (
    <div className="flex flex-col gap-3 mt-4 p-2">
      {[...Array(count)].map((_, i) => (
        <div
          key={i}
          className="shadow rounded-xl p-3 border bg-section-background animate-pulse"
        >
          <div className="flex justify-between items-center mb-2">
            {/* Question placeholder */}
            <Skeleton className="h-4 w-3/4 rounded-sm" />

            {/* Action buttons placeholder */}
            <div className="flex gap-2">
              <Skeleton className="h-4 w-4 rounded-sm" /> {/* Edit */}
              <Skeleton className="h-4 w-4 rounded-sm" /> {/* Delete */}
            </div>
          </div>

          {/* Answer placeholder */}
          <div className="mt-1">
            <Skeleton className="h-3 w-full rounded-sm mb-1" />
            <Skeleton className="h-3 w-5/6 rounded-sm" />
          </div>
        </div>
      ))}
    </div>
  );
};
