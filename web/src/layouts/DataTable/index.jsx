import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { flexRender } from "@tanstack/react-table";
import { DataTableHeader } from "./Header";
import PaginationItem from "@mui/material/PaginationItem";
import { Plus, RotateCw, RefreshCcw } from "lucide-react";
import { FilterDialog } from "../../components/filterDialog";
import ExportButtons from "../../utils/ExportButton";
import { useDataTable } from "./useTableConfig";
import { DataTablePagination } from "./Pagination";
import { useEffect, useState } from "react";
import { ConfirmationDialog } from "../../components/confirmationDialog";
import { ScrollArea } from "@/components/ui/scroll-area"
import ExcelManager from "../../components/ExcelManager";


export function DataTable({title='', uploadUrl, enableUploadCsv = false, downloadSampleUrl, downloadUrl, disablePagination = false, disableFooter = false, disableTabs = false, disableHeader = false, handleAdd, isLoading, renderSkeleton, alertValue, alertSubmitHandler, startPoint, setStartPoint, onRefresh, setFilter, pageTitle, defaultValue, userData, columns, tabListData, setTabValue, handlers, buttonNavigation, buttonNavTitle, page,
  setPage,
  limit,
  setLimit,
  total, }) {
  const navigate = useNavigate();
  const { table, dataIds } = useDataTable(userData, columns);

  const [inputValue, setInputValue] = useState({});

  const [showAlertDialog, setShowAlertDialog] = useState(false);


  const onFilter = (data) => {
    setFilter((prev) => ({ ...prev, ...data }))
  }


  const refreshHandler = () => {
    setInputValue({})
    onRefresh()
    setFilter({});
    setPage(1); 
    setLimit(50);
  }

  return (
    <>
      {!disableHeader && <DataTableHeader pageTitle={pageTitle} />}
      <div className=" border rounded-2xl bg-section-background text-foreground">

        <div className="flex flex-1 flex-col gap-4">

          {/* Tabs + Add button */}
          {(!disableTabs && (tabListData?.length || onRefresh || buttonNavigation || handlers?.length || handleAdd || title))
            &&
            <div className="p-2 flex rounded-lg items-center justify-between">

              <div>
                <div className="gap-3 flex rounded-lg items-center justify-between">
                  {title && <h3 className="text-lg font-semibold">{title}</h3>}
                  {(defaultValue && tabListData?.length) &&
                    // <Tabs defaultValue={defaultValue}>
                    <Tabs value={defaultValue} onValueChange={(val) => setTabValue(val)}>

                      <TabsList className="border-1 ">
                        {tabListData?.map((row) => (
                          <TabsTrigger key={row.key} value={row.key}
                            onClick={() => !isLoading && setTabValue(row.key)}
                            disabled={isLoading}
                          // onClick={() => setTabValue(row.key)} value={row.key}
                          >
                            {row.key} {row.count}
                          </TabsTrigger>
                        ))}
                      </TabsList>
                    </Tabs>
                  }
                </div>
              </div>


              <div className="flex gap-3">
                <div className="flex gap-3 items-center">
                  {onRefresh && <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        {/* <button
                      onClick={refreshHandler}
                      className="p-2 rounded-md hover:bg-gray-100 transition"
                    > */}
                        <button
                          onClick={!isLoading ? refreshHandler : undefined}
                          disabled={isLoading}
                          className={`p-2 rounded-md transition ${isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100"
                            }`}
                        >
                          <RefreshCcw
                            size={20}
                            className={`${isLoading ? "animate-[spin_1s_linear_infinite]" : ""}`}
                          />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Refresh</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>}

                  {buttonNavigation && <Button
                    disabled={isLoading}
                    size="sm"
                    className="ml-4 text-sm p-2 flex items-center gap-2"
                    onClick={() => navigate(buttonNavigation, { state: { pageTitle, mode: "add" } })}
                  >
                    {buttonNavTitle || 'Add new'} <Plus size={16} />
                  </Button>}

                  {handleAdd && <Button
                    disabled={isLoading}
                    size="sm"
                    className="ml-4 text-sm p-2 flex items-center gap-2"
                    onClick={() => !isLoading && handleAdd ? handleAdd() : null}
                  >
                    {buttonNavTitle || 'Add new'} <Plus size={16} />
                  </Button>}

                  {handlers?.length && handlers?.map((data) => {
                    const Icon = data?.icon
                    return <Button
                      disabled={isLoading}
                      size="sm"
                      className="ml-4 text-sm p-2 flex items-center gap-2"
                      onClick={data?.action}
                    >
                      {data?.title || 'Tool'} <Icon size={16} />
                    </Button>
                  })}
                </div>
              </div>
            </div>}
        </div>
        <div className="h-[calc(100vh-250px)] overflow-auto  text-foreground  border-[#868686]">
          {/* Table */}

          <Table className=" table-auto w-full border-collapse">

            <TableHeader className=" border-1 z-10">

              {table?.getHeaderGroups()?.map((hg) => (
                <TableRow key={hg.id} className="odd:bg-gray-50 even:bg-background">
                  {hg.headers?.map((header) => (

                    <TableHead
                      key={header.id}
                      className={`whitespace-nowrap px-2 py-1 text-sm bg-section-background text-foreground text-left ${isLoading ? "opacity-50 cursor-not-allowed" : ""
                        }`}

                    >
                      <div className="flex justify-between items-center gap-2 w-[100%] relative">
                        <span className="flex-1"> 
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                        </span>
                        <FilterDialog
                          disabled={isLoading}
                          filterType={header.column.columnDef.filterType}
                          headerName={header.column.columnDef.header}
                          columnId={header.column.columnDef.accessorKey}
                          onFilter={onFilter}
                          onRefresh={onRefresh}
                          inputValue={inputValue}
                          setInputValue={setInputValue}
                        />
                      </div>
                    </TableHead>
                  ))}
                </TableRow>

              ))}
            </TableHeader>

            <TableBody>
              {isLoading ? (
                // ✅ show skeleton in body only
                <TableRow>
                  <TableCell colSpan={columns?.length} className="p-0">
                    {renderSkeleton && renderSkeleton()}
                  </TableCell>
                </TableRow>
              ) : table.getRowModel()?.rows?.length ? (
                <SortableContext items={dataIds} strategy={verticalListSortingStrategy}>
                  {table.getRowModel()?.rows?.map((row) => (
                    <TableRow key={row.id}>
                      {row.getVisibleCells()?.map((cell) => (
                        <TableCell className="text-xs " key={cell.id}>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </SortableContext>
              ) : (
                <TableRow>
                  <TableCell colSpan={columns?.length} className="text-center">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>


          </Table>
        </div>
        {/* Footer */}
        {!disableFooter && <div className="  mt-4 rounded-lg  p-4 flex items-center justify-between">
          {!disablePagination ? <DataTablePagination
            page={page}
            setPage={setPage}
            limit={limit}
            setLimit={setLimit}
            total={total}
          /> : <div></div>}
          {/* <ExportButtons /> */}
          <ExcelManager uploadCsv={enableUploadCsv} downloadSampleUrl={downloadSampleUrl} uploadUrl={uploadUrl} downloadUrl={downloadUrl} />
        </div>}
      </div>
    </>
  );
}
