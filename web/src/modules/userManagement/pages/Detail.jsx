import { useNavigate, useParams } from "react-router-dom";
import { DetailHeader, useAddHeader, useDetailHeader } from "../../../layouts/DataTable/Header";
import { Copy, Edit, GalleryVerticalEnd, List } from "lucide-react";
import { useUserDetail, useUpdateUser } from "../useData";
import React, { useEffect, useRef, useState } from "react";
import InnerImageZoom from "react-inner-image-zoom";
import 'react-inner-image-zoom/lib/styles.min.css'
import { copyContent } from "../../../utils";
import { Listbox } from "@headlessui/react"
import { ConfirmationBox } from "../../../components/confirmationDialog";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { getAssignedUserColumns } from "../Columns";
import { DataTable } from "../../../layouts/DataTable";
import DesignationAndRole, { ModuleAccessTable } from "../../Roles&Permission/Designation/index";

const logsData = [
  { name: "Pankaj Sharma", date: "11 Sep 2025, 12:25 PM", remark: "Order Has Been Created" },
  { name: "Yogesh Singh", date: "09 Oct 2024, 5:53 PM", remark: "Order Has Been Created" },
];

const DocumentBlock = ({ title, data, isLoading }) => {
  const documents = { ...data };
  const [activeTab, setActiveTab] = useState("Pan Card");
  const tabs = [
    { id: "Pan Card", label: "Pan Card" },
    { id: documents?.documentName, label: documents?.documentName },
  ];


  return (
    <div className="p-4 bg-white border rounded-lg shadow-xs">
      <div>
        {/* Tabs */}
        <div className="border-b border-gray-100">
          <ul
            className="flex flex-wrap -mb-px text-sm font-medium text-center"
            role="tablist"
          >
            {tabs.map((tab) => (
              <li key={tab.id} className="me-2" role="presentation">
                <button
                  onClick={() => setActiveTab(tab.id)}
                  className={`inline-block px-2 border-b-1 rounded-t-lg ${activeTab === tab.id
                    ? "text-black border-black "
                    : "text-gray-500 border-transparent hover:text-gray-600 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300"
                    }`}
                  role="tab"
                  aria-selected={activeTab === tab.id}
                >
                  {tab.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
};

const DetailBlock = ({ params, refetchDetails, title, data, isLoading, extraAction }) => {
  const displayData = { ...data };

  return (
    <div className="p-4 bg-section-background border rounded-lg shadow-xs">
      <div className="flex justify-between items-start relative">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        {extraAction}
      </div>

      <div className="flex flex-wrap gap-4">
        {Object.entries(displayData).map(([key, item]) =>
          isLoading ? (
            <div
              key={key}
              className="relative flex flex-1 h-12 flex-col px-2 py-1 bg-gray-200 min-w-[150px] rounded-md overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer" />
            </div>
          ) : (
            <div
              key={key}
              title={item?.value || "---"}
              className="flex flex-1 flex-col px-2 py-1 hover:bg-card bg-section-background min-w-[150px] rounded-md"
            >
              <div className="flex justify-between items-center">
                <span className="text-foreground text-xs">{item?.label}</span>
                {item?.action && (
                  <button
                    onClick={item.action.onClick}
                    className="items-center flex cursor-pointer mt-1 text-blue-600 text-xs hover:underline"
                  >
                    {item?.action?.label}
                    {item?.action?.icon &&
                      React.createElement(item?.action?.icon, {
                        className: "w-4 h-4 ml-1 inline",
                      })}
                  </button>
                )}

                {item?.label == 'Profile Status' && <StatusDropdown message='You want to update profile status to' updateKey="status_of_profile" id={params?.id} refetch={refetchDetails} title="Edit" />}
              </div>
              <span className="line-clamp-1 text-muted-foreground font-medium">
                {item?.value || "---"}
              </span>
            </div>
          )
        )}
      </div>
    </div>
  );
};


const ListBlock = ({ title, data = [], isLoading, extraAction }) => {
  return (
    <div className="p-4  border rounded-lg shadow-xs">
      <div className="flex justify-between items-start relative mb-2">
        <h3 className="text-lg font-semibold">{title}</h3>
        {extraAction}
      </div>

      {isLoading ? (
        <div className="space-y-2">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="h-10 bg-gray-200 rounded-md overflow-hidden relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer" />
            </div>
          ))}
        </div>
      ) : data?.length > 0 ? (
        <div className="border rounded-md overflow-hidden">
          <div className="max-h-64 overflow-y-auto">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-gray-100 text-gray-600 sticky top-0">
                <tr>
                  {Object.keys(data[0]).map((key) => (
                    <th key={key} className="px-3 py-2 font-medium whitespace-nowrap">
                      {key.replace(/_/g, " ")}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((row, i) => (
                  <tr
                    key={i}
                    className="border-t hover:bg-gray-50 transition-colors"
                  >
                    {Object.values(row).map((val, j) => (
                      <td key={j} className="px-3 py-2 text-gray-800 whitespace-nowrap">
                        {typeof val === "object" ? JSON.stringify(val) : String(val)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="text-gray-500 text-sm py-6 text-center">
          No records found
        </div>
      )}
    </div>
  );
};

const ViewAll = ({ setOpenAdd }) => {
  return <button onClick={() => setOpenAdd(true)} className="cursor-pointer">
    <GalleryVerticalEnd height={'20px'} width={'20px'} />
  </button>
}


const EditButton = ({id, initialData}) => {
  
  const navigate = useNavigate();
  return <button onClick={() => navigate(`/edit-user/${id}`, { state: { pageTitle: "User Detail", mode: 'edit', initialData } })} className="cursor-pointer">
    <Edit height={'20px'} width={'20px'} />
  </button>
}

const ASSIGNED_USERS = [
              { id: 1, name: "Login", time: "2025-10-12 09:00 AM" },
              { id: 2, name: "File Upload", time: "2025-10-12 09:30 AM" },
              { id: 3, name: "Profile Update", time: "2025-10-12 10:00 AM" },
              { id: 3, name: "Profile Update", time: "2025-10-12 10:00 AM" },
              { id: 3, name: "Profile Update", time: "2025-10-12 10:00 AM" },
              { id: 3, name: "Profile Update", time: "2025-10-12 10:00 AM" },
              { id: 3, name: "Profile Update", time: "2025-10-12 10:00 AM" },
              { id: 3, name: "Profile Update", time: "2025-10-12 10:00 AM" },
              { id: 3, name: "Profile Update", time: "2025-10-12 10:00 AM" },
              { id: 3, name: "Profile Update", time: "2025-10-12 10:00 AM" },
            ]

const UserDetail = () => {
  const pageTitle = useDetailHeader();
  const params = useParams();
  const [openAdd, setOpenAdd] = useState(false);
  const { detail, basicDetail, loginCredential, isLoading, currentStatus, refetch: refetchDetails } =
    useUserDetail(params?.id);

  const [statusToShow, setStatusToShow] = useState(currentStatus || "PENDING");
  const statusColor =
    statusToShow === "APPROVED"
      ? "bg-green-100 text-green-800"
      : statusToShow === "REJECT"
        ? "bg-red-100 text-red-800"
        : statusToShow === "PENDING"
          ? "bg-yellow-100 text-yellow-800"
          : "bg-gray-100 text-gray-800";

  return (
    <>
      <DetailHeader pageTitle={pageTitle} />

      <div className="flex flex-1 mt-4 gap-2 p-4 pt-0">
        {/* Left: Detail Sections */}
        <div className="flex-1 flex flex-col gap-6">
          <DetailBlock params={params} refetchDetails={refetchDetails} title="Basic Detail" data={basicDetail} isLoading={isLoading} extraAction={<EditButton id={params?.id} initialData={detail} />} />
          {detail && <ModuleAccessTable selectedRole={{id:detail?.designation_id}} title={"Modules & Permissions"} disableUpdates={true} />}
        </div>

        {/* Right: Logs */}
        <div className="w-[300px] p-4 ">
          <div className="mb-3">
            <DetailBlock params={params} refetchDetails={refetchDetails} title="Login Credential" data={loginCredential} isLoading={isLoading} 
            // extraAction={<EditButton id={params?.id} initialData={detail} />} 
            />
          </div>

          {/* <ListBlock
            title="Assigned Users"
            isLoading={false}
            data={ASSIGNED_USERS}
            extraAction={<ViewAll setOpenAdd={setOpenAdd} />}
          /> */}
        </div>
      </div>

      <Dialog open={openAdd} onOpenChange={setOpenAdd}>
        <DialogContent className="max-w-7xl">
          <DialogHeader>
            <DialogTitle>Assigned Users</DialogTitle>
          </DialogHeader>
          <DataTable
            disableHeader={true}
            disableTabs={true}
            disableFooter={true}
            userData={ASSIGNED_USERS} // ✅ Pass static data here
            columns={getAssignedUserColumns()} // ✅ Use columns
            isLoading={false} // ✅ No loader
            defaultValue="PENDING"
            setTabValue={() => { }}
            setFilter={() => { }}
            onRefresh={() => { }}
            startPoint={0}
            setStartPoint={() => { }}
            page={1}
            limit={50}
            setPage={() => { }}
            setLimit={() => { }}
            total={ASSIGNED_USERS.length}
          />
          <DialogFooter>
            <Button variant="ghost" onClick={() => setOpenAdd(false)}>Cancel</Button>
            {/* <Button onClick={handleSubmit(handleCreate)}>Save</Button> */}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};


export default UserDetail;


const StatusDropdown = ({
  title = "Update KYC",
  id,
  refetch,
  updateKey,
  currentStatus,
  onStatusChange,
  message,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [pendingStatus, setPendingStatus] = useState(null);

  const dropdownRef = useRef(null);
  const { mutate: updateInfluencer } = useUpdateUser();
  const options = ["PENDING", "APPROVED", "REJECT"];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleConfirm = (action) => {
    if (action === "continue" && pendingStatus) {
      updateInfluencer(
        { id, payload: { [updateKey]: pendingStatus } },
        {
          onSuccess: () => {
            onStatusChange?.(pendingStatus); // 👈 update badge in parent
            refetch();
          },
        }
      );
    }
    setShowConfirm(false);
  };

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen((p) => !p)}
        className="flex cursor-pointer text-blue-600 text-xs hover:underline"
      >
        {title}
      </button>

      {/* Dropdown Options */}
      {isOpen && (
        <div className="absolute right-0 mt-1 bg-white border rounded-md shadow-lg z-50">
          {options.map((option) => (
            <div
              key={option}
              onClick={() => {
                setPendingStatus(option);
                setShowConfirm(true);
                setIsOpen(false);
              }}
              className="py-1 px-3 cursor-pointer hover:bg-blue-500 hover:text-white"
            >
              {option}
            </div>
          ))}
        </div>
      )}

      {/* Confirmation Modal */}
      <ConfirmationBox
        openDialog={showConfirm}
        setOpenDialog={setShowConfirm}
        title="Are You Sure?"
        message={
          pendingStatus
            ? `${message || "You want to update status to"} "${pendingStatus}"?`
            : ""
        }
        onResult={handleConfirm}
      />
    </div>
  );
};


