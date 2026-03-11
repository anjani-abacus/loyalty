import { useEffect, useState } from "react";
import { DataTable } from "../../layouts/DataTable";
import Container from "../../components/ui/container";
import { FilterDialog } from "../../components/filterDialog";
import { useCategoryWiseScanReport, useCouponHistoryReport, useInfluencerScanLoginReport, useMonthlyScanAgingReport, useRedemptionReport, useScanPointReport, useSevenDaysNotScannedReport, useStateKycStatusReport, useStateLoginAgingReport, useStreak, useUserBonusPointsReport, useUserScanReport } from "./useData";
import { getColumns } from "./UserScan";
import { useParams } from "react-router-dom";
import { fetchUserScanReport } from "../../reactQuery/services/reports/reportsApi";
import { EXPORT_REPORT_CATEGORY_SCAN, EXPORT_REPORT_COUPON_HISTORY, EXPORT_REPORT_INFLUENCER_SCAN_LOGIN, EXPORT_REPORT_MONTHLY_SCAN_AGING, EXPORT_REPORT_REDEMPTION, EXPORT_REPORT_SCAN_POINT, EXPORT_REPORT_SEVEN_DAYS_NOT_SCANNED, EXPORT_REPORT_STATE_KYC_STATUS, EXPORT_REPORT_STATE_LOGIN_AGING, EXPORT_REPORT_USER_BONUS_POINTS, EXPORT_REPORT_USER_SCAN } from "../../reactQuery/endPoints";

  function reportTitle(title) {
    return title
      .split('-')
      .map(word =>
        word.charAt(0).toUpperCase() + word.slice(1)
      )
      .join(' ') + ' Report';
  }

const Layout = () => {
  const { fetchStreak, streakData, isLoading, error } = useStreak();
  const [showFilterDialog, setShowFilterDialog] = useState(false);
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)

  const [list, setList] = useState([])
  const [downloadUrl, setDownloadUrl] = useState('')

  const { report } = useParams();
  const { refetch: fetchRedemptionReport } = useRedemptionReport();
  const { refetch: fetchUserScanReport } = useUserScanReport();
  const { refetch: fetchSevenDaysNotScannedReport } = useSevenDaysNotScannedReport();
  const { refetch: fetchCouponHistoryReport } = useCouponHistoryReport();
  const { refetch: fetchCategoryWiseScanReport } = useCategoryWiseScanReport();
  const { refetch: fetchUserBonusPointsReport } = useUserBonusPointsReport();
  const { refetch: fetchMonthlyScanAgingReport } = useMonthlyScanAgingReport();
  const { refetch: fetchInfluencerScanLoginReport } = useInfluencerScanLoginReport();
  const { refetch: fetchStateKycStatusReport } = useStateKycStatusReport();
  const { refetch: fetchStateLoginAgingReport } = useStateLoginAgingReport();
  const { refetch: fetchScanPointReport } = useScanPointReport();

  useEffect(() => {
    // PRIMARY REPORTS
    if(report=='redemption') {
     fetchRedemptionReport().then(res=>{
      console.log('success response....', res?.data?.data)
      setList(res?.data?.data)
      setDownloadUrl(EXPORT_REPORT_REDEMPTION)
    })
  }
  if(report=='user-scan'){
    fetchUserScanReport().then(res=>{
      console.log('success response....', res?.data?.data)
      setList(res?.data?.data)
      setDownloadUrl(EXPORT_REPORT_USER_SCAN)
    })
  }
  if(report=='seven-days-not-scanned'){
     fetchSevenDaysNotScannedReport().then(res=>{
      console.log('success response....', res?.data?.data)
      setList(res?.data?.data)
      setDownloadUrl(EXPORT_REPORT_SEVEN_DAYS_NOT_SCANNED)
    })
  }
  if(report=='coupon-history'){
    fetchCouponHistoryReport().then(res=>{
      console.log('success response....', res?.data?.data)
      setList(res?.data?.data)
      setDownloadUrl(EXPORT_REPORT_COUPON_HISTORY)
    })
  }
  
  // // OTHER REPORTS
  if(report=='category-wise-scan'){
    fetchCategoryWiseScanReport().then(res=>{
      console.log('success response....', res?.data?.data)
      setList(res?.data?.data)
      setDownloadUrl(EXPORT_REPORT_CATEGORY_SCAN)
    })
  }
  if(report=='point-summary'){
    // fetchCouponHistoryReport().then(res=>{
      console.log('success response....', [])
      setList([])
      setDownloadUrl('')
    // })
  }
  if(report=='scan-point'){
    fetchScanPointReport().then(res=>{
      console.log('success response....', res?.data?.data)
      setList(res?.data?.data)
      setDownloadUrl(EXPORT_REPORT_SCAN_POINT)
    })
  }
  if(report=='user-scans'){
    // fetchCouponHistoryReport().then(res=>{
      console.log('success response....', [])
      setList([])
      setDownloadUrl('')
    // })
  }
  if(report=='user-bonus-points'){
    fetchUserBonusPointsReport().then(res=>{
      console.log('success response....', res?.data?.data)
      setList(res?.data?.data)
      setDownloadUrl(EXPORT_REPORT_USER_BONUS_POINTS)
    })
  }
  if(report=='influencer-scan-login'){
    fetchInfluencerScanLoginReport().then(res=>{
      console.log('success response....', res?.data?.data)
      setList(res?.data?.data)
      setDownloadUrl(EXPORT_REPORT_INFLUENCER_SCAN_LOGIN)
    })
  }
  if(report=='user-rewards-points'){
    // fetchCouponHistoryReport().then(res=>{
      console.log('success response....', [])
      setList([])
      setDownloadUrl('')
    // })
  }
  if(report=='state-wise-login-aging'){
    fetchStateLoginAgingReport().then(res=>{
      console.log('success response....', res?.data?.data)
      setList(res?.data?.data)
      setDownloadUrl(EXPORT_REPORT_STATE_LOGIN_AGING)
    })
  }
  if(report=='state-kyc-status'){
    fetchStateKycStatusReport().then(res=>{
      console.log('success response....', res?.data?.data)
      setList(res?.data?.data)
      setDownloadUrl(EXPORT_REPORT_STATE_KYC_STATUS)
    })
  }
  if(report=='monthly-scan-aging'){
    fetchMonthlyScanAgingReport().then(res=>{
      console.log('success response....', res?.data?.data)
      setList(res?.data?.data)
      setDownloadUrl(EXPORT_REPORT_MONTHLY_SCAN_AGING)
    })
  }
  if(report=='month-wise-scan'){
    // fetchCouponHistoryReport().then(res=>{
      console.log('success response....', [])
      setList([])
      setDownloadUrl('')
    // })
  }
  if(report=='wallet-balance'){
    // fetchCouponHistoryReport().then(res=>{
      console.log('success response....', [])
      setList([])
      setDownloadUrl('')
    // })
  }
  }, [report])

  if (isLoading) return <Container>Loading tickets...</Container>;
  if (error) return <Container>Error loading ticket data</Container>;

  return (
    <Container>
      <DataTable
        pageTitle={reportTitle(report)}
        userData={list || []}
        columns={getColumns({list, report, page, limit })}
        tabListData={[]}
        defaultValue=""
        setTabValue={() => { }}
        buttonNavigation=""
        downloadUrl={downloadUrl}
        disablePagination={true}
      />
      <FilterDialog openDialog={showFilterDialog} setOpenDialog={setShowFilterDialog} />
    </Container>
  );
};

export default Layout;
