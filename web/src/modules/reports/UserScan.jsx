import moment from "moment";

export const getColumns = ({list, report, page, limit}) => {
// console.log('asdf ===> ', list[0]?.monthly_data)
  // PRIMARY REPORTS
  if(report=='user-scan') return userScanColumns({page, limit});
  if(report=='category-wise-scan') return categroyWiseScanColumns({page, limit});
  if(report=='redemption') return redemptionColumns({page, limit});
  if(report=='point-summary') return pointSummaryColumns({page, limit});
  if(report=='scan-point') return scanPointColumns({page, limit});
  if(report=='user-scans') return scanPointColumns({page, limit});
  
  // OTHER REPORTS
  if(report=='user-bonus-points') return userBonusPointsColumns({page, limit});
  if(report=='influencer-scan-login') return influencerScanLoginColumns({page, limit});
  if(report=='user-rewards-points') return userRewardsPointColumns({page, limit});
  if(report=='state-wise-login-aging') return stateWiseLoginAgingColumns({page, limit});
  if(report=='state-kyc-status') return stateKycStatusColumns({page, limit});
  if(report=='monthly-scan-aging') return monthlyScanAgingColumns({list, page, limit});
  if(report=='month-wise-scan') return monthWiseScanColumns({page, limit});
  if(report=='seven-days-not-scanned') return sevenDaysNotScannedColumns({page, limit});
  if(report=='coupon-history') return couponHistoryColumns({page, limit});
  if(report=='wallet-balance') return scanPointColumns({page, limit});
}  
  
const userScanColumns = ({page, limit}) => [
  { accessorKey: "srno", header: "Sr.No", cell: ({ row }) => row.index + 1 + (page>1?limit*(page-1):0)},
  { accessorKey: "name", header: "Name" },
  { accessorKey: "mobile", header: "Mobile No" },
  { accessorKey: "state", header: "State" },
  { accessorKey: "district", header: "District" },
  { accessorKey: "total_scans", header: "Total Scan" },
  { accessorKey: "total_scan_value", header: "Total Scan Value" },
  { accessorKey: "last_scan_date", header: "Last Scan Date",
    cell: ({ row }) => row.original.last_scan_date ? (moment(row.original.last_scan_date).format("DD MMM, YYYY")) : "---", }
];

const categroyWiseScanColumns = ({page, limit}) => [
  { accessorKey: "srno", header: "Sr.No", cell: ({ row }) => row.index + 1 + (page>1?limit*(page-1):0)},
  { accessorKey: "point_category_id", header: "Point Category Id" },
  { accessorKey: "point_category_name", header: "Point Category" },
  { accessorKey: "total_scan_value", header: "Total Scan (Value)" },
  { accessorKey: "total_scans", header: "Total Scan (Count)" }
];

const redemptionColumns = ({page, limit}) => [
  { accessorKey: "srno", header: "Sr.No", cell: ({ row }) => row.index + 1 + (page>1?limit*(page-1):0)},
  { accessorKey: "name", header: "Name" },
  { accessorKey: "mobile", header: "Mobile No" },
  { accessorKey: "state", header: "State" },
  { accessorKey: "district", header: "District" },
  // { accessorKey: "city", header: "City" },
  { accessorKey: "total_redeems", header: "Total Number of Redeem" },
  { accessorKey: "total_redeem_value", header: "Total Redeem Value" },
  { accessorKey: "last_redeem_date", header: "Last Redeem Date", 
    cell: ({ row }) => row.original.last_redeem_date ? (moment(row.original.last_redeem_date).format("DD MMM YYYY")) : "---", }
];

const pointSummaryColumns = ({page, limit}) => [
  { accessorKey: "srno", header: "Sr.No", cell: ({ row }) => row.index + 1 + (page>1?limit*(page-1):0)},
  { accessorKey: "name", header: "Name" },
  { accessorKey: "mobile_no", header: "Mobile No" },
  { accessorKey: "state", header: "State" },
  { accessorKey: "district", header: "District" },
  { accessorKey: "city", header: "City" },
  { accessorKey: "bonus_dpoint", header: "Anniversary Point" },
  { accessorKey: "bonus_po2int", header: "Birthday Point" },
  { accessorKey: "bonus_poicent", header: "Bonus Point" },
  { accessorKey: "bonus_pzoient", header: "Redeem Point" },
  { accessorKey: "bonus_povient", header: "Referral Point" },
  { accessorKey: "bonus_poieent", header: "Reopen Point" },
  { accessorKey: "bonus_poivent", header: "Scanned Point" },
  { accessorKey: "bonus_poienwt", header: "Spin & Wining Point" },
  { accessorKey: "bounus_poient", header: "Welcome Point" },
  { accessorKey: "bonus_poienht", header: "Current Balance" },
];

const scanPointColumns = ({page, limit}) => [
  { accessorKey: "srno", header: "Sr.No", cell: ({ row }) => row.index + 1 + (page>1?limit*(page-1):0)},
  { accessorKey: "state", header: "State" },
  { accessorKey: "product_detail", header: "Product Name" },
  { accessorKey: "coupon_value", header: "Coupon Value" },
  { accessorKey: "month", header: ()=>{
    return moment(new Date).format("MMM, Y")
  }, cell:({row})=>(row.original?.total_scan_value_current && row.original?.total_scan_current) ? (`${row.original?.total_scan_current}/${row.original?.total_scan_value_current}`) : '--' },
  { accessorKey: "year", 
    header: "2025",
    cell:({row})=>(row.original?.total_scan_value && row.original?.total_scan) ? (`${row.original?.total_scan}/${row.original?.total_scan_value}`) : '--' },
];

const userBonusPointsColumns = ({page, limit}) => [
  { accessorKey: "srno", header: "Sr.No", cell: ({ row }) => row.index + 1 + (page>1?limit*(page-1):0)},
  { accessorKey: "name", header: "Name" },
  { accessorKey: "mobile", header: "Mobile No" },
  { accessorKey: "state", header: "State" },
  { accessorKey: "district", header: "District" },
  { accessorKey: "city", header: "City" },
  { accessorKey: "total_bonus_points", header: "Bonus Points" },
];

const influencerScanLoginColumns = ({page, limit}) => [
  { accessorKey: "srno", header: "Sr.No", cell: ({ row }) => row.index + 1 + (page>1?limit*(page-1):0)},
  { accessorKey: "name", header: "Name" },
  { accessorKey: "mobile", header: "Mobile No" },
  { accessorKey: "state", header: "State" },
  { accessorKey: "district", header: "District" },
  { accessorKey: "city", header: "City" },
  { accessorKey: "last_login_timestamp", header: "Last Login Date", 
    cell: ({ row }) => row.original.last_login_timestamp ? (moment(row.original.last_login_timestamp).format("DD MMM, YYYY")) : "---"
   },
  { accessorKey: "last_scan_date", header: "Last Scan Date",
    cell: ({ row }) => row.original.last_scan_date ? (moment(row.original.last_scan_date).format("DD MMM, YYYY")) : "---"
   },
  { accessorKey: "current_wallet_balnc", header: "Current Balance"}
];

const userRewardsPointColumns = ({page, limit}) => [
  { accessorKey: "srno", header: "Sr.No", cell: ({ row }) => row.index + 1 + (page>1?limit*(page-1):0)},
  { accessorKey: "name", header: "Name" },
  { accessorKey: "mobile_no", header: "Mobile No" },
  { accessorKey: "state", header: "State" },
  { accessorKey: "district", header: "District" },
  { accessorKey: "city", header: "City" },
  { accessorKey: "Bonus Points", header: "Bonus Points" },
  { accessorKey: "Anniversary Points", header: "Anniversary Points" },
  { accessorKey: "Birthday Points", header: "Birthday Points" },
  { accessorKey: "Referral Points", header: "Referral Points" },
  { accessorKey: "Welcome Points", header: "Welcome Points" },
];

const stateWiseLoginAgingColumns = ({page, limit}) => [
  { accessorKey: "srno", header: "Sr.No", cell: ({ row }) => row.index + 1 + (page>1?limit*(page-1):0)},
  { accessorKey: "state", header: "State" },
  { accessorKey: "total_users", header: "Total User" },
  { accessorKey: "logged_within_7_days", header: "Less than 7 days" },
  { accessorKey: "logged_within_15_days", header: "Less than 15 days" },
  { accessorKey: "logged_within_30_days", header: "Less than 30 days" }
];

const stateKycStatusColumns = ({page, limit}) => [
  { accessorKey: "srno", header: "Sr.No", cell: ({ row }) => row.index + 1 + (page>1?limit*(page-1):0)},
  { accessorKey: "state", header: "State" },
  { accessorKey: "total_customers", header: "Total User Count" },
  { accessorKey: "kyc_status_pending", header: "Pending KYC Status" },
  { accessorKey: "kyc_status_approved", header: "Verified KYC Status" },
  { accessorKey: "document_verified", header: "Document Verified" },
];

const monthlyScanAgingColumns = ({list=[], page, limit}) => [
  { accessorKey: "srno", header: "Sr.No", cell: ({ row }) => row.index + 1 + (page>1?limit*(page-1):0)},
  { accessorKey: "state", header: "State" },
  { accessorKey: "total_influencers", header: "Total Influencer" },

  ...(list[0]?.monthly_data ? list[0]?.monthly_data?.map((elem, i)=>({ 
    accessorKey: elem?.month, 
    header: elem?.month, 
    cell:({row})=> row.original?.monthly_data[i]?.total_scan_value
   })) : [])
];

const monthWiseScanColumns = ({page, limit}) => [
  { accessorKey: "srno", header: "Sr.No", cell: ({ row }) => row.index + 1 + (page>1?limit*(page-1):0)},
  { accessorKey: "name", header: "Name" },
  { accessorKey: "mobile_no", header: "Mobile No" },
  { accessorKey: "state", header: "State" },
  { accessorKey: "district", header: "District" },
  { accessorKey: "city", header: "City" },
  { accessorKey: "Oct 2025", header: "Oct, 2025" },
];

const sevenDaysNotScannedColumns = ({page, limit}) => [
  { accessorKey: "srno", header: "Sr.No", cell: ({ row }) => row.index + 1 + (page>1?limit*(page-1):0)},
  { accessorKey: "name", header: "Name" },
  { accessorKey: "mobile", header: "Mobile No" },
  { accessorKey: "state", header: "State" },
  { accessorKey: "district", header: "District" },
  { accessorKey: "total_scan_value_before_7D", header: "Scanned Value Before 7D" },
  { accessorKey: "last_scan_date_before_7D", header: "Last Scan Date",
    cell: ({ row }) => row.original.last_scan_date_before_7D ? (moment(row.original.last_scan_date_before_7D).format("DD MMM, YYYY")) : "---"
   },
];

const couponHistoryColumns = ({page, limit}) => [
  { accessorKey: "srno", header: "Sr.No", cell: ({ row }) => row.index + 1 + (page>1?limit*(page-1):0)},
  { accessorKey: "user_name", header: "Name" },
  { accessorKey: "last_generation_date", header: "Last Coupon Generated",
    cell: ({ row }) => row.original.last_generation_date ? (moment(row.original.last_generation_date).format("DD MMM, YYYY")) : "---"
   },
  { accessorKey: "total_batches", header: "Total Batches" },
  { accessorKey: "total_coupons_generated", header: "Total Coupon Generated" },
  { accessorKey: "remark", header: "Remarks" },
];