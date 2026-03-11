import { DataTable } from "../../layouts/DataTable";
import Container from "../../components/ui/container";
import { useEffect, useState } from "react";
import { FilterDialog } from "../../components/filterDialog";
import { ConfirmationBox, ConfirmationDialog } from "../../components/confirmationDialog";
import { getColumns } from "./Columns";
import { useUsers } from "./useData";

const ManageUser = () => {
  const [showAlertDialog, setShowAlertDialog] = useState(false);
  const [userType, setUserType] = useState("");
  const [filter, setFilter] = useState({})
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(50);

  const [selectedRow, setSelectedRow] = useState(null);
  const [showStatusConfirm, setShowStatusConfirm] = useState(false);

  const {
    fetchUsersData,
    userData,
    error
  } = useUsers();

  useEffect(() => {
    fetchUsersData({ page: page, limit: limit, filters: { ...filter } })
  }, [filter])

  const handleStatusChange = (row) => {
    setSelectedRow(row);
    setShowStatusConfirm(true);
  };

  const onRefresh = () => {
    setFilter({})
  }

  const confirmStatusChange = () => {
    const newStatus = !selectedRow.active_status;
    console.log(newStatus)
    // updateLoginStatus(
    //   {
    //     id: selectedRow.id,
    //     payload: { active_status: newStatus },
    //   },
    //   {
    //     onSuccess: () => {
    //       setShowStatusConfirm(false);
    //       fetchInfluencerData({
    //         page,
    //         limit,
    //         filters: {
    //           ...filter,
    //           status_of_profile: tabValue,
    //           influencer_type_name: influencerCategory?.toUpperCase() || "",
    //         },
    //       });
    //     },
    //       onError: () => {
    //     setShowStatusConfirm(false);
    //   },

        
    //   }
    // );
  };


  if (error) {
    return (
      <Container>
        <div className="flex flex-col items-center justify-center h-64 text-center">
          <h2 className="text-xl font-semibold text-red-600">Failed to load users</h2>
          <p className="text-gray-600 mt-2">
            {error?.data?.message || "We couldn't connect to the server. Please try again later."}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <DataTable
        pageTitle="Users"
        userData={userData || []}
        columns={getColumns({ handleStatusChange })}
        buttonNavigation="/add-user"

        // defaultValue={tabValue}
        // tabListData={tabListData}
        // setTabValue={setTabValue}
        setFilter={setFilter}
        onRefresh={onRefresh}
        page={page}
        setPage={setPage}
        limit={limit}
        setLimit={setLimit}
        total={30}
      />
      <FilterDialog />
      <ConfirmationDialog
        openDialog={showAlertDialog}
        setOpenDialog={setShowAlertDialog}
        value={userType}
      />

      <ConfirmationBox
        openDialog={showStatusConfirm}
        setOpenDialog={setShowStatusConfirm}
        title="Change Login Status"
        message={`Are you sure you want to ${selectedRow?.active_status ? "deactivate" : "activate"
          } this influencer?`}
        onResult={confirmStatusChange}
        onCancel={() => setShowStatusConfirm(false)}
      />
    </Container>
  );
};

export default ManageUser;
