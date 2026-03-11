import { useEffect, useState } from "react";
import { DataTable } from "../../layouts/DataTable";
import Container from "../../components/ui/container";
import { FilterDialog } from "../../components/filterDialog";
import { useStreak } from "./useData";
import { getColumns } from "./Columns";

const StreakList = () => {
  const { fetchStreak, streakData, isLoading, error } = useStreak();
  const [showFilterDialog, setShowFilterDialog] = useState(false);
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)

  useEffect(()=>{
    fetchStreak({page, limit})
  }, [])

  if (isLoading) return <Container>Loading tickets...</Container>;
  if (error) return <Container>Error loading ticket data</Container>;

  return (
    <Container>
      <DataTable
        pageTitle="Streak List"
        userData={streakData || []}
        columns={getColumns({page, limit})}
        tabListData={[]}
        defaultValue=""
        setTabValue={() => {}}
        buttonNavigation=""
      />
      <FilterDialog openDialog={showFilterDialog} setOpenDialog={setShowFilterDialog} />
    </Container>
  );
};

export default StreakList;
