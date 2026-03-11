// InfluencerDashboard.jsx
import React from "react";
import { InfluencerCard, RedeemCard, TicketSection } from "./Cards";
import InfluencerTypeCard from "./CardsType";
import { Card, CardContent } from "@/components/ui/card";
// import { HashLoader } from "react-spinners";
import Container from "@/components/ui/container";
import { useGiftStats, useInfluencerStats, useRedeemStats, useTicketStats } from "./useData";
import { DetailHeader } from "../../layouts/DataTable/Header";
import InfluencerStateChart from "./StateCharts";
import TopInfluencersCard from "./TopInfluencer";
import ScanVsGeneratedChart from "./Scanned6Month"
import { GiftPieChart } from "./GiftAvailable";

import CouponScanPieChart from "./CouponScanPie";



// const { pendingCount, totalCount, isLoading } = useRedeemStats();

export default function InfluencerDashboard() {
  const {
    influencerData,
    typeWise,
    kycWise,
    profileWise,
    isLoading,
    top30,
  } = useInfluencerStats();


  const {
    redeemData,
    pendingCount,
    totalCount } = useRedeemStats();

  const {
    pendingTicket,
    totalTicket, closedTicket } = useTicketStats();




  const { formattedData, totalGift } = useGiftStats();
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[70vh]">
        {/* <HashLoader color="#0BAAF4" /> */}
      </div>
    );
  }

  return (
    <Container>
      <DetailHeader pageTitle={"Dashboard"} />

      <div className="flex flex-col gap-2 py-3 grid-cols-1 p-3 ">
        {/* --- Summary Card Section --- */}

        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
          <InfluencerCard
            total={influencerData?.totalInfluencers}
            active={influencerData?.activeInfluencers}
            inactive={influencerData?.inactiveInfluencers}
          />
          <RedeemCard
            total={totalCount}
            pending={pendingCount}
          />
          <TicketSection

            total={totalTicket}
            pending={pendingTicket}
            closed={closedTicket}
          />

        </div>

        <div className="flex gap-2 ">
          <InfluencerStateChart />

          <TopInfluencersCard data={top30} />
        </div>


        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
          {/* <InfluencerTypeCard title="Influencer Type Wise" data={typeWise} /> */}
          <GiftPieChart
            title="Influencer Type Wise"
            description="Painter / Contractor"
            data={typeWise}
            titleType="Influencers"
          />

          <InfluencerTypeCard title="KYC Status Wise" description="Pending / Apporved / Reject" data={kycWise} />
          <InfluencerTypeCard title="Profile Status Wise" description="Pending / Apporved / Reject" data={profileWise} />

          <GiftPieChart
            title="Gift Delivery Status"
            description="In Progress / Shipped / Delivered"
            titleType="Gifts"
            useGiftApi={true}
            // colorConfig={colorConfig}
          />


        </div>

        <div className="flex gap-2">
          {/* <InfluencerTypeCard title="Influencer Type Wise" data={typeWise} /> */}
          <ScanVsGeneratedChart />
          {/* <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"> */}
          <CouponScanPieChart />
          {/* </div> */}

        </div>

      </div>
    </Container>
  );
}
