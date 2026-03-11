import React from "react";
import { useBannerList, useDeleteBanner } from "./useData";
import { DetailHeader } from "../../../layouts/DataTable/Header";
import { Plus, RefreshCcw, Trash2 } from "lucide-react";
import Container from "../../../components/ui/container";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/ui/button";
import { ConfirmationBox } from "../../../components/confirmationDialog";
import { BannerSkeleton } from "../../../skeleton/tableSkeleton";
import InnerImageZoom from "react-inner-image-zoom";

const BannerList = () => {
  const navigate = useNavigate();

  // ✅ Data Fetching
  const { data: bannerData = [], refetch:fetchBannerList, isLoading, isFetching, isError, error } = useBannerList();
  const { mutate: deleteBanner, isPending: isDeleting } = useDeleteBanner();

  const [openDialog, setOpenDialog] = React.useState(false);
  const [selectedId, setSelectedId] = React.useState(null);

  // 🗑️ Handle delete confirmation
  const handleDeleteClick = (id) => {
    setSelectedId(id);
    setOpenDialog(true);
  };

  const handleDialogResult = (action) => {
    if (action === "continue" && selectedId) {
      deleteBanner(selectedId, {
        onSuccess: () => {
          setOpenDialog(false);
          setSelectedId(null);
        },
      });
    } else {
      setOpenDialog(false);
      setSelectedId(null);
    }
  };

  const refreshHandler = () => {
    fetchBannerList()
  }

  // ➕ Add new banner
  const handleAdd = () => navigate("/add-banner");

  // 🧠 Loading State
  if (isLoading) {
    return (
      <Container>
        <DetailHeader pageTitle="Banner List" />
        <div className="flex justify-end mr-10 items-center">
          <Button disabled className="cursor-pointer" >
            <Plus className="w-4 h-4 mr-1" /> Add Banner
          </Button>
        </div>
        <BannerSkeleton count={2} />
      </Container>
    );
  }

  if (isError)
    return (
      <Container>
        <p className="text-red-600 text-center mt-5">
          ⚠️ Failed to load banners: {error?.message || "Something went wrong"}
        </p>
      </Container>
    );

  return (
    <Container>
      <DetailHeader pageTitle="Banner List" />
      <div className=" border rounded-2xl h-svh bg-section-background text-foreground">
        {/* Add Button */}
        {/* <div className="flex justify-end mr-10 items-center">
          <Button onClick={handleAdd}>
            <Plus className="w-4 h-4 mr-1" /> Add Banner
          </Button>
        </div> */}

        <div className="flex  m-2 rounded-xl p-2 gap-3 justify-end items-center">
          <button
            onClick={(!isLoading || !isFetching) ? refreshHandler : undefined}
            disabled={(isLoading || isFetching)}
            className={`p-2 rounded-md transition ${(isLoading || isFetching) ? "opacity-50 cursor-not-allowed" : "hover:bg-card"
              }`}
          >
            <RefreshCcw
              size={20}
              className={`${(isLoading || isFetching) ? "animate-[spin_1s_linear_infinite] " : ""}`}
            />
          </button>
          <Button onClick={handleAdd}
            className="ml-4 text-sm p-2 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Add Banner
          </Button>
        </div>

        {/* Banner Cards */}
        <div className="flex flex-wrap gap-4 mt-6 p-2">
          {bannerData.length > 0 ? (
            bannerData.map((banner) => (
              <div
                key={banner.id}
                className="shadow rounded-xl p-3 w-[300px] border hover:shadow-md transition bg-section-background"
              >
                <div className="flex flex-col">
                  <InnerImageZoom
                    src={banner?.banner_image}
                    zoomSrc={banner?.banner_image}
                    zoomType="hover"
                    zoomPreload
                    className="w-full rounded-xl object-cover"
                  />

                  <div className="flex mt-3">
                    <h3 className="flex-1 text-sm font-semibold line-clamp-2">{banner.banner_name || "—"}</h3>
                    <div className="flex justify-end">
                      <Button
                        size="sm"
                        className="cursor-pointer"
                        variant="destructive"
                        onClick={() => handleDeleteClick(banner.id)}
                        disabled={isDeleting}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    User Type: {banner.user_type || "ALL"}
                  </p>

                  {/* <div className="flex justify-center gap-3 mt-3">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => navigate(`/edit-banner/${banner.id}`)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDeleteClick(banner.id)}
                    disabled={isDeleting}
                  >
                    {isDeleting ? "Deleting..." : "Delete"}
                  </Button>
                </div> */}
                </div>
              </div>
            ))
          ) : (
            <p className="text-center w-full text-gray-500 mt-5">
              No banners found.
            </p>
          )}
        </div>
      </div>
      {/* Confirmation Box */}
      <ConfirmationBox
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        title="Delete Banner"
        message="Are you sure? This action cannot be undone."
        onResult={handleDialogResult}
      />
    </Container>
  );
};

export default BannerList;

