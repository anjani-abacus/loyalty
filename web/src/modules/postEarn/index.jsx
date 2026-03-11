import { useEffect, useState } from "react";
import { DataTable } from "../../layouts/DataTable";
import Container from "../../components/ui/container";
import { FilterDialog } from "../../components/filterDialog";
import { usePostEarn } from "./useData";
import { getColumns } from "./Columns";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X } from "lucide-react";

const PostEarnList = () => {
  const { fetchPostEarn, streakData, isLoading, error, total } = usePostEarn();
  const [showFilterDialog, setShowFilterDialog] = useState(false);
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(()=>{
    fetchPostEarn({page, limit})
  }, [page])

  const onRefresh = () => {
  setPage(1);
};

  if (isLoading) return <Container>Loading tickets...</Container>;
  if (error) return <Container>Error loading ticket data</Container>;

  return (
    <Container>
      <DataTable
        pageTitle="Post & Earn"
        userData={streakData || []}
        columns={getColumns({page, limit, setSelectedImage})}
        tabListData={[]}
        defaultValue=""
        setTabValue={() => {}}
        buttonNavigation=""

        onRefresh={onRefresh}
        page={page}
        limit={limit}
        setPage={setPage}
        setLimit={setLimit}
        total={total}
      />
      <FilterDialog openDialog={showFilterDialog} setOpenDialog={setShowFilterDialog} />

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

export default PostEarnList;
