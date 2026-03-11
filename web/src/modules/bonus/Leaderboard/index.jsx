import { DataTable } from "../../../layouts/DataTable";
import Container from "../../../components/ui/container";
import { LoaderIcon } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import { FilterDialog } from "../../../components/filterDialog";
import { ConfirmationDialog } from "../../../components/confirmationDialog";
import { getColumns } from "./Columns";
import { useLeaderboardStateWise, useLeaderboardDistrictWise } from "./useData";


const LeaderboardList = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [tabValue, setTabValue] = useState("State Wise");
  const [showAlertDialog, setShowAlertDialog] = useState(false);
  const [spinWinType, setSpinWinType] = useState("");
  const [filter, setFilter] = useState({})

  const { fetchLeaderboardStateWise, leaderboardDataStateWise, isLoading:isLoadingStateWise, error:errorStateWise } = useLeaderboardStateWise();
  const { fetchfetchLeaderboardDistrictWise, leaderboardDataDistrictWise, isLoading:isLoadingDistrictWise, error:errorDistrictWise } = useLeaderboardDistrictWise();

  useEffect(()=>{
    console.log(tabValue)
    if(tabValue=='State Wise'){
      fetchLeaderboardStateWise({state:(filter?.state||"Rajasthan")})
    }else if(tabValue=='District Wise'){
      fetchfetchLeaderboardDistrictWise({district:"FARIDABAD"})
    }
  }, [tabValue, filter])

  const onRefresh = () => {
    if(tabValue=='State Wise'){
      fetchLeaderboardStateWise({state:(filter?.state||"Rajasthan")})
    }else if(tabValue=='District Wise'){
      fetchfetchLeaderboardDistrictWise({district:"FARIDABAD"})
    }
  }

  if (errorStateWise) {
    return (
      <Container>
        <div className="flex flex-col items-center justify-center h-64 text-center">
          <h2 className="text-xl font-semibold text-red-600">Failed to load leaderboard data</h2>
          <p className="text-gray-600 mt-2">
            {errorStateWise?.data?.message || "We couldn't connect to the server. Please try again later."}
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
        isLoading={isLoadingStateWise}
        pageTitle="Leaderboard"
        userData={tabValue=='District Wise' ? leaderboardDataDistrictWise : leaderboardDataStateWise  || []}
        columns={getColumns()}
        tabListData={[{key:'State Wise', value:'State Wise'}, {key:'District Wise', value:'District Wise'}]}
        defaultValue={tabValue}
        setTabValue={setTabValue}
        enableUploadCsv={false}
        filter={filter}
        onRefresh={onRefresh}
        setFilter={setFilter}
        disableFooter={true}
      />
      <FilterDialog />
      <ConfirmationDialog
        openDialog={showAlertDialog}
        setOpenDialog={setShowAlertDialog}
        value={spinWinType}
      />
    </Container>
  );
};

export default LeaderboardList;
