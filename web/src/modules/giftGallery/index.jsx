
import { DataTable } from "../../../src/layouts/DataTable";
import Container from "../../../src/components/ui/container";
import { FilterDialog } from "../../../src/components/filterDialog";
import { useRef, useState, useEffect } from "react";
import { ConfirmationBox } from "../../../src/components/confirmationDialog";
import { getColumns } from "./Columns";
import { useGiftList, useUpdateGiftStatus } from "./useData";
import TableSkeleton from "../../skeleton/tableSkeleton";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X } from "lucide-react";
import { fetchGiftList } from "../../reactQuery/services/giftGalary/giftGalaryApi";
import { id } from "zod/v4/locales";

const GiftList = () => {
  const [showAlertDialog, setShowAlertDialog] = useState(false);
  // const [selectedGiftType, setSelectedGiftType] = useState("");
  const [selectedGift, setSelectedGift] = useState(null);
  const [tabValue, setTabValue] = useState("GIFT");
  const [filter, setFilter] = useState({});
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [selectedImage, setSelectedImage] = useState(null);

  const { giftListData, tabListData, total, mutate, isPending, error } = useGiftList();
  const { mutate: updateGiftStatus } = useUpdateGiftStatus()


  const isFirstRender = useRef(true);
  useEffect(() => {
      mutate({

        gift_type: tabValue,
        page: page,
        limit: limit,
        filters: {
          ...filter, gift_type: tabValue.toUpperCase(),
        }
      });
  }, [tabValue, filter, page, limit, mutate]);

  const onRefresh = () => {
    setFilter({
      ...filter,
      gift_type: tabValue.toUpperCase(),
    });
    // mutate({ gift_type: tabValue, page, limit });
  };


  const handleStatusChange = (selectedGift, status) => {
    console.log("Toggle gift status", selectedGift, status);

    setSelectedGift({
      id: selectedGift?.id || null,
      status: selectedGift?.status
    });


    setShowAlertDialog(true);

  };
  const handleResult = (action) => {
    if (action === "continue") {
      updateGiftStatus(
        {
          id: selectedGift.id,
          payload: { status: selectedGift?.status === true ? false : true },
        },
        // console.log("selectedGift", selectedGift ,id, payload),

        {
          onSuccess: () => {
            mutate({
              page,
              limit,
              filters: { ...filter, gift_type: tabValue.toUpperCase() },
              gift_type: tabValue,

            })
            setShowAlertDialog(false)
          }
        }

      );
    }
    setShowAlertDialog(false);
    setSelectedGift(null);
  };
  // console.log("selectedGift", selectedGift);




  const handleTypeChange = (value) => {
    setShowAlertDialog(true);
    setSelectedGift(value);
  };




  return (
    <Container>
      <DataTable
        pageTitle={tabValue === "cash" ? "Cash Gallery" : "Gift Gallery"}
        buttonNavigation={tabValue === "cash" ? "/add-cash" : "/add-gift"}
        userData={giftListData || []}
        columns={getColumns({
          gift_type: tabValue.toUpperCase(),
          handleStatusChange,
          page,
          limit,
          setSelectedImage,
        })}
        renderSkeleton={() => <TableSkeleton columns={getColumns({})} rows={limit} />}

        tabListData={tabListData}
        defaultValue={tabValue}
        setTabValue={setTabValue}
        setFilter={setFilter}
        onRefresh={onRefresh}
        page={page}
        setPage={setPage}
        limit={limit}
        setLimit={setLimit}
        total={total || 0}
        isLoading={isPending}
        error={error}

      />

      <FilterDialog />

      <ConfirmationBox
        openDialog={showAlertDialog}
        setOpenDialog={setShowAlertDialog}
        value={selectedGift?.status}
        onResult={handleResult}
      />

      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="flex justify-center items-center bg-white p-4">
            <button
      onClick={() => setSelectedImage(null)}
      className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
    >
      <X />
    </button>
          <img
            src={selectedImage}
            alt="Gift Preview"
            className="max-w-full max-h-[80vh] object-contain"
          />
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default GiftList;


