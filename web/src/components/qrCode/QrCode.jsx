import React from "react";
import { QRCodeSVG } from "qrcode.react";

export default function QRCodeLayout({value, size=200}) {
  return (
    <div style={{ padding: 20 }}>
      <QRCodeSVG 
        value={value}
        size={size} 
        bgColor="#ffffff"
        fgColor="#000000"
        level="H"
      />
    </div>
  );
}