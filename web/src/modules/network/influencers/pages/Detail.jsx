import { useNavigate, useParams } from "react-router-dom";
import { DetailHeader, useAddHeader, useDetailHeader } from "../../../../layouts/DataTable/Header";
import { Copy, Edit, LoaderIcon } from "lucide-react";
import { useInfluencerDetail, useUpdateInfluencer, useUpdateKycStatus, useUpdateProfileStatus } from "../useData";
import React, { useEffect, useRef, useState } from "react";
import InnerImageZoom from "react-inner-image-zoom";
import 'react-inner-image-zoom/lib/styles.min.css'
import { copyContent } from "../../../../utils";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Listbox } from "@headlessui/react"
import { ConfirmationBox, ConfirmationDialog } from "../../../../components/confirmationDialog";
import { updateInfluencer } from "../../../../reactQuery/services/influencers/influencersApi";
import Ledger from "./Ledger";
import ScanHistory from "./ScanHistory";
import RedeemHistory from "./RedeemHistory";
import { toast } from "react-toastify";


const DocumentBlock = ({ title, data, isLoading }) => {
  const documents = { ...data };
  const [activeTab, setActiveTab] = useState("Pan Card");
  const tabs = [
    // { id: "Pan Card", label: "Pan Card" },
    { id: documents?.documentName, label: documents?.documentName },
  ];


  return (
    <div className="p-4 bg-card border rounded-lg shadow-xs">
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
                  className={`inline-block px-2 border-b-1 rounded-t-lg "text-foreground border-black "`}
                  role="tab"
                >
                  {tab.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Tab Content */}
        <div>
          {/*{activeTab === "Pan Card" && (
            <div className="p-4 rounded-lg bg-gray-50">
              <DocumentCard url={documents?.panImage} document_no={documents?.panNumber} />
            </div>
          )} */}
          {(
            <div className="p-4 flex items-start gap-3 rounded-lg bg-card">
              {
                documents?.documentImage?.map(({ url, title }) => <DocumentCard url={url} title={title} document_no={documents?.documentNumber} />)
              }
            </div>
          )}

          {activeTab === "settings" && (
            <div className="p-4 rounded-lg bg-card">
              <p className="text-sm text-card-foreground">
                This is some placeholder content for the{" "}
                <strong className="font-medium text-foreground">
                  Settings tab
                </strong>
                .
              </p>
            </div>
          )}

          {activeTab === "contacts" && (
            <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                This is some placeholder content for the{" "}
                <strong className="font-medium text-gray-800 dark:text-white">
                  Contacts tab
                </strong>
                .
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};





const DetailBlock = ({ params, refetchDetails, title, data, isLoading, extraAction }) => {
  const displayData = { ...data };

  return (
    <div className="p-4 bg-background border rounded-lg shadow-xs">
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
              className="flex flex-1 flex-col px-2 py-1 hover:bg-hovers bg-section-background min-w-[150px] rounded-md"
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
              <span className="line-clamp-1 text-card-foreground font-medium">
                {item?.value || "---"}
              </span>
            </div>
          )
        )}
      </div>
    </div>
  );
};


const EditButton = ({ initialData }) => {
  const pageTitle = useDetailHeader();

  const navigate = useNavigate();
  return <button onClick={() => navigate("/influencerEdit", { state: { pageTitle: pageTitle, mode: 'edit', initialData } })} className="cursor-pointer">
    <Edit height={'20px'} width={'20px'} />
  </button>
}

const InfluencerNetworkDetail = () => {
  const pageTitle = useDetailHeader();
  const params = useParams();
  const { detail, basicDetail, documentDetail, dealerDetail, isLoading, currentStatus, refetch: refetchDetails, logsData  } =
    useInfluencerDetail(params?.id);


  // const [basicDetail?.kycStatus?.value, setStatusToShow] = useState("");
  const statusColor =
    basicDetail?.kycStatus?.value === "APPROVED"
      ? "bg-green-100 text-green-800"
      : basicDetail?.kycStatus?.value === "REJECT"
        ? "bg-red-100 text-red-800"
        : basicDetail?.kycStatus?.value === "PENDING"
          ? "bg-yellow-100 text-yellow-800"
          : "bg-gray-100 text-gray-800";
  const handleConfirm = (action) => {
    if (action === "continue" && pendingStatus) {
      updateInfluencer(
        { id, payload: { [updateKey]: pendingStatus } },
        {
          onSuccess: () => {
            // setStatusToShow(pendingStatus); // Update the badge
            refetch();
          },
        }
      );
    }
    setShowConfirm(false);
  };
  const [tabValue, setTabValue] = useState("BASIC DETAIL");
  const tabListData = [
    { key: "BASIC DETAIL" },
    { key: "LEDGER" },
    { key: "SCAN HISTORY" },
    { key: "REDEEM HISTORY" }
  ]

  return (
    <>
      <DetailHeader pageTitle={pageTitle} />

      <div className=" border rounded-2xl mt-2 m-2 bg-section-background text-foreground">
        <div className="p-2">
          {/* Tabs */}
          <div>
            <div className="gap-3 flex rounded-lg items-center justify-between">
              {(tabValue && tabListData?.length) &&
                // <Tabs defaultValue={defaultValue}>
                <Tabs value={tabValue} onValueChange={(val) => setTabValue(val)}>

                  <TabsList className="border-1 ">
                    {tabListData?.map((row) => (
                      <TabsTrigger key={row.key} value={row.key}
                        onClick={() => !isLoading && setTabValue(row.key)}
                        disabled={isLoading}

                      // onClick={() => setTabValue(row.key)} value={row.key}
                      >
                        {row.key}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </Tabs>
              }
            </div>
          </div>
        </div>

        {tabValue == 'BASIC DETAIL' &&
          <div className="flex flex-1 gap-2 p-4 pt-0">
            <div className="flex-1 flex flex-col gap-6">
              <DetailBlock params={params} refetchDetails={refetchDetails} title="Basic Detail" data={basicDetail} isLoading={isLoading}
              
              extraAction={<EditButton initialData={detail} />} />
              <DetailBlock title="Dealer Detail" data={dealerDetail} isLoading={isLoading} />

              {/* <DetailBlock
              title="Bank Detail"
              data={bankDetail}
              isLoading={isLoading}
              extraAction={
                <div className="flex " >
                  <span className={`px-2 py-1 rounded-md text-xs font-semibold ${statusColor}`}>
                    {basicDetail?.kycStatus?.value}
                  </span>
                  <StatusDropdown message='You want to update kyc status to'
                    id={params?.id} updateKey="kyc_status"
                    refetch={refetchDetails}
                    title="Update KYC"
                    currentStatus={bankDetail?.kyc_status?.value} />

                </div>
              }
          /> */}

              {/* <DetailBlock
            title="Bank Detail"
            data={bankDetail}
            isLoading={isLoading}
            extraAction={
              <div className="text-right flex flex-col items-end">
                <div className="flex items-center gap-2">
             
                  <span
                    className={`px-2 py-1 rounded-md text-xs font-semibold ${statusColor}`}
                  >
                    {basicDetail?.kycStatus?.value}
                  </span>

                  
                  {(basicDetail?.kycStatus?.value == 'PENDING' && (bankDetail?.paymentPreference?.value
                  && bankDetail?.upiId?.value
                  && bankDetail?.bankName?.value
                  && bankDetail?.accountNo?.value
                  && bankDetail?.ifscCode?.value)) && <StatusDropdown
                    title="Update KYC"
                    message="You want to update kyc status to"
                    id={params?.id}
                    updateKey="kyc_status"
                    refetch={refetchDetails}
                    currentStatus={basicDetail?.kycStatus?.value}
                  />}

                </div>
                {(!bankDetail?.paymentPreference?.value
                  || !bankDetail?.upiId?.value
                  || !bankDetail?.bankName?.value
                  || !bankDetail?.accountNo?.value
                  || !bankDetail?.ifscCode?.value) &&
                  <span className="text-red-500">Update bank and document details to change kyc status</span>
                  }
              </div>
            }
          /> */}


              <DocumentBlock title="Document Detail" data={documentDetail} isLoading={isLoading} />
            </div>


         

            {/* Right: Logs  */}
           <div className="w-[300px] p-4 bg-background border rounded-lg shadow-xs max-h-[96.4vh] overflow-y-auto">
          <h3 className="text-lg font-semibold mb-4">Logs</h3>
          <div className="flex flex-col gap-3">
            {logsData.map((log, index) => (
              <div key={index} className="flex flex-col bg-section-background p-2 rounded-md">
                <span className="text-card-foreground text-xs">{log.name} :</span>
                <span className="text-foreground text-sm">{log.date}</span>
                <span className="text-card-foreground  text-xs">Remark: {log.remark} </span>
                {/* <span className="text-card-foreground  text-xs">Remark: {log.remark}</span> */}
              </div>
                
              ))}
          </div>
        </div>
          </div>}

        {
          tabValue == 'LEDGER' && <Ledger influencerId={params?.id} />
        }

        {
          tabValue == 'SCAN HISTORY' && <ScanHistory influencerId={params?.id} />
        }

        {
          tabValue == 'REDEEM HISTORY' && <RedeemHistory influencerId={params?.id} />
        }
      </div>
    </>
  );
};


export default InfluencerNetworkDetail;




function DocumentCard({ document_no, title = '', url }) {

  const [isValidImage, setIsValidImage] = useState(false);

    useEffect(() => {
    if (!url) return setIsValidImage(false);

    const img = new Image();
    img.src = url;
    img.onload = () => setIsValidImage(true);
    img.onerror = () => setIsValidImage(false);

    // cleanup
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [url]);

  return (
    <div className="">
      <div className="w-[250px] h-[200px] p-1">
        <div className="flex flex-col gap-2 h-full">
          {/* Product Title */}
          {title && (
            <span className="text-xs font-semibold text-foreground flex items-center cursor-pointer hover:text-blue-600">
              {title}
            </span>
          )}

          {/* Product Image */}
          <div className="flex-1 flex items-center justify-center">
            {isValidImage ? (
              <InnerImageZoom
                src={url}
                zoomSrc={url}
                zoomType="hover"
                zoomPreload
                className="w-full h-[150px] rounded-md object-cover"
              />
            ) : (
              <div className="w-full h-[150px] flex items-center justify-center rounded-md bg-gray-100 text-gray-400 text-xs">
                Image not available
              </div>
            )}
          </div>

        </div>
        {/* Document Number */}
        <span
          className="text-xs font-semibold text-foreground flex items-center cursor-pointer hover:text-blue-600"
          onClick={() => copyContent(document_no?.toUpperCase() || "")}
        >
          {document_no}
          <Copy className="w-3 h-3 ml-2" />
          
        </span>
      </div>
    </div>

  );
}


// const StatusDropdown = ({ title = "Edit", id, refetch, updateKey, message }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [showConfirm, setShowConfirm] = useState(false);
//   const [pendingStatus, setPendingStatus] = useState(null);
//   const dropdownRef = useRef(null);

//   const { mutate: updateInfluencer } = useUpdateInfluencer();
//   const options = ["PENDING", "APPROVED", "REJECT"];

//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
//         setIsOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const handleConfirm = (action) => {
//     if (action === "continue" && pendingStatus) {
//       updateInfluencer(
//         { id, payload: { [updateKey]: pendingStatus } },
//         { onSuccess: () => refetch() }
//       );
//     }
//     setShowConfirm(false);
//   };

//   return (
//     <div className="relative inline-block" ref={dropdownRef}>
//       {/* Button */}
//       <button
//         onClick={() => setIsOpen((p) => !p)}
//         className="flex cursor-pointer text-blue-600 mt-1 text-xs hover:underline"
//       >
//         {title}
//       </button>

//       {/* Dropdown */}
//       {isOpen && (
//         <div className="absolute right-0 mt-1 bg-white border rounded-md shadow-lg z-50">
//           {options.map((option) => (
//             <div
//               key={option}
//               onClick={() => {
//                 setPendingStatus(option);
//                 setShowConfirm(true);
//                 setIsOpen(false);
//               }}
//               className="py-1 px-3 cursor-pointer hover:bg-blue-500 hover:text-white"
//             >
//               {option}
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Confirmation Modal */}
//       <ConfirmationBox
//         openDialog={showConfirm}
//         setOpenDialog={setShowConfirm}
//         title="Are You Sure?"
//         message={`${message || 'You want to update status to'} "${pendingStatus}"?`}
//         onResult={handleConfirm}
//       />
//     </div>
//   );
// };



// const StatusDropdown = ({ title = "Update KYC", id, refetch, updateKey }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [showConfirm, setShowConfirm] = useState(false);
//   const [pendingStatus, setPendingStatus] = useState(null);


//   const dropdownRef = useRef(null);
//   const { mutate: updateInfluencer } = useUpdateInfluencer();

//   const options = ["PENDING", "APPROVED", "REJECT"];

//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
//         setIsOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const handleConfirm = (action) => {
//     if (action === "continue" && pendingStatus) {
//       updateInfluencer(
//         { id, payload: { [updateKey]: pendingStatus } },
//         {
//           onSuccess: () => {
//             setStatusToShow(pendingStatus); // Update the badge
//             refetch();
//           },
//         }
//       );
//     }
//     setShowConfirm(false);
//   };


//   return (
//     <div className="flex " ref={dropdownRef}>
//       <div className="flex items-center space-x-2" >

//         <button
//           onClick={() => setIsOpen((p) => !p)}
//           className="flex cursor-pointer text-blue-600 text-xs hover:underline"
//         >
//           {title}
//         </button>

//       </div>



//       {/* Dropdown Options */}
//       {isOpen && (
//         <div className="absolute right-16 mt-5 bg-white border rounded-md shadow-lg z-50">
//           {options.map((option) => (
//             <div
//               key={option}
//               onClick={() => {
//                 setPendingStatus(option);
//                 setShowConfirm(true);
//                 setIsOpen(false);
//               }}
//               className="py-1 px-3 cursor-pointer hover:bg-blue-500 hover:text-white"
//             >
//               {option}
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Confirmation Modal */}
//       <ConfirmationBox
//         openDialog={showConfirm}
//         setOpenDialog={setShowConfirm}
//         title="Are You Sure?"
//         message={`${pendingStatus ? `You want to update status to "${pendingStatus}"?` : ""
//           }`}
//         onResult={handleConfirm}
//       />
//     </div>
//   );
// };

const StatusDropdown = ({
  title = "Update",
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
  const { mutate: updateKycStatus } = useUpdateKycStatus();
  const { mutate: updateProfileStatus, isPending: profileStatusLoading } = useUpdateProfileStatus();
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
    console.log('action, pendingStatus', action, pendingStatus)
    if (action === "continue" && pendingStatus) {
      if (updateKey == 'kyc_status') {
        updateKycStatus(
          { id, payload: { [updateKey]: pendingStatus } },
          {
            onSuccess: () => {
              onStatusChange?.(pendingStatus); // 👈 update badge in parent
              refetch();
            },
          }
        );
      }

      if (updateKey == 'status_of_profile') {
        updateProfileStatus(
          { id, payload: { [updateKey]: pendingStatus } },
          {
            onSuccess: () => {
              // toast.success('Updated Successfully!');
              onStatusChange?.(pendingStatus); // 👈 update badge in parent
              refetch();
            },
          }
        );
      }

    }
    setShowConfirm(false);
  };

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        disabled={profileStatusLoading}
        onClick={() => setIsOpen((p) => !p)}
        className="flex cursor-pointer text-blue-600 text-xs hover:underline"
      >
        {profileStatusLoading ? <LoaderIcon className="h-4 w-4 animate-spin" /> : title}
      </button>



      {/* Dropdown Options */}
      {isOpen && (
        <div className="absolute right-0 mt-1 bg-section-background border rounded-md shadow-lg z-50">
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


