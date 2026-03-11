import React, { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import QRCodeLayout from "../../components/qrCode/QrCode";
import { Copy, Eraser, Printer, X } from "lucide-react";
import { useReactToPrint } from "react-to-print";
import { DataTableHeader } from "../../layouts/DataTable/Header";
import { copyContent } from "../../utils";

const ReprintCoupon = () => {
  const [couponNumber, setCouponNumber] = useState("");
  const [showQR, setShowQR] = useState(false);
  const contentRef = useRef();

  const handleClear = () => {
    setCouponNumber("");
    setShowQR(false);
  };

  const handlePrint = useReactToPrint({
    contentRef, // ✅ v3 API
  });

  return (
    <div className="p-6">
      <DataTableHeader pageTitle="Re-print Coupon" />
      <div className="flex mt-2.5">
        <div className="bg-section-background text-foreground shadow-md rounded-xl p-3 ">
        <div className="flex items-center gap-2 mb-6">
          <div className="flex">
            <Input
              type="text"
              placeholder="Enter Coupon Number"
              value={couponNumber}
              onChange={(e) => setCouponNumber(e.target.value)}
              className="w-72"
              style={{ paddingRight: '45px' }}
            />

            <Button
              onClick={handleClear}
              variant="outline"
              className="flex items-center gap-2 bg-section-background -ml-[30px]"
            >
              <Eraser />
            </Button>
          </div>
        </div>
        {couponNumber && (
          <div className="flex justify-center">
            <div>
              <ComponentToPrint
                qrListData={[{ coupon_code: couponNumber }]}
                contentRef={contentRef}
              />
              <Button
                onClick={handlePrint}
                className="flex mx-auto w-full items-center gap-2 cursor-pointer"
              >
                <Printer size={16} /> Print
              </Button>
            </div>
          </div>
        )}
      </div>
      </div>
    </div>
  );
};

export default ReprintCoupon;

const ComponentToPrint = ({ qrListData, contentRef }) => (
  <div
    ref={contentRef}
    className="flex flex-col items-center"
  >
    {qrListData?.map((data) => (
      <div
        key={data?.coupon_code}
        className="flex flex-col items-center gap-3"
      >
        <QRCodeLayout size={160} value={data?.coupon_code?.toUpperCase()} />
        <span
          className="text-lg font-semibold text-gray-700 flex items-center cursor-pointer hover:text-blue-600"
          onClick={() =>
            copyContent(data?.coupon_code?.toUpperCase() || "")
          }
        >
          {data?.coupon_code?.toUpperCase() || "—"}
          <Copy className="w-4 h-4 ml-2" />
        </span>
      </div>
    ))}
  </div>
);
