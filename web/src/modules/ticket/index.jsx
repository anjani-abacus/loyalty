import { useEffect, useState } from "react";
import { DataTable } from "../../layouts/DataTable";
import Container from "../../components/ui/container";
import { FilterDialog } from "../../components/filterDialog";
import { useTicketData, useTicketUpdate } from "./useData";
import { getTicketColumns } from "./Columns";
import { ConfirmationBox } from "../../components/confirmationDialog";
import TableSkeleton from "../../skeleton/tableSkeleton";


const TicketManagement = () => { 
  const { mutate: fetchTicketData, data: ticketData, isPending, error } = useTicketData();
  const [showFilterDialog, setShowFilterDialog] = useState(false);
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(50)

  const [alertValue, setAlertValue] = useState(null)
  const [showAlertDialog, setShowAlertDialog] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const { mutate: updateTicketStatus } = useTicketUpdate()

  const handleTypeChange = (value, row) => {
    setSelectedRow(row);
    console.log(row)
    setAlertValue({ value, id: row?.id }); 
    setShowAlertDialog(true);
  };

  const refreshHandler = () => {
    setPage(1); 
    setLimit(10);
    fetchTicketData({page:1, limit:50})
  }
  

  useEffect(() => {
    fetchTicketData({ page, limit }) 
  }, [page, limit])

  const confirmStatusChange = (action, values) => {
    console.log(values)
    if (action === "continue" && alertValue) {
      updateTicketStatus({ id: alertValue?.id, payload: {"close_remark":values?.remark, "ticket_status": alertValue?.value } }, {
        onSuccess: () => {
          fetchTicketData({page, limit})
        }
      })
    }
  };

  if (error) return <Container>Error loading ticket data</Container>;

  return (
    <Container>
      <DataTable
        pageTitle="Ticket"
        userData={ticketData?.data || []}
        columns={getTicketColumns({page, limit, handleTypeChange })}
        tabListData={[]}
        defaultValue=""
        renderSkeleton={() => <TableSkeleton columns={getTicketColumns({})} rows={50} />}
        isLoading={isPending}
        setTabValue={() => { }}
        buttonNavigation=""
        setFilter={() => { }}

        page={page}
        limit={limit}
        setPage={setPage}
        setLimit={setLimit}
        total={ticketData?.count}
        onRefresh={refreshHandler}
      />
      <FilterDialog openDialog={showFilterDialog} setOpenDialog={setShowFilterDialog} />

      <ConfirmationBox
        openDialog={showAlertDialog}
        setOpenDialog={setShowAlertDialog}
        title="Change Login Status"
        message={`Are you sure you want to change status?`}
        onResult={confirmStatusChange}
        onCancel={() => setShowAlertDialog(false)}
        remarkEnabled={true}
      />

    </Container>
  );
};

export default TicketManagement;
