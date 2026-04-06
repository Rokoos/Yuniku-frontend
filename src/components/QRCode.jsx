import React from "react";
import { QRCodeSVG } from "qrcode.react";

const QRCode = () => {
  const url = "https://yuniku.netlify.app";

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-white rounded-xl shadow-sm border border-[#1A2F23]/10 max-w-sm mx-auto">
      <h3 className="font-body text-[#1A2F23] mb-4 text-center font-medium">
        Scan to visit Yuniku
      </h3>

      {/* Centered QR Code Container */}
      <div className="bg-white p-2 border-4 border-[#1A2F23]/5 rounded-lg">
        <QRCodeSVG
          value={url}
          size={200}
          bgColor={"#ffffff"}
          fgColor={"#1A2F23"}
          level={"L"}
          includeMargin={false}
        />
      </div>

      <p className="mt-4 text-xs text-[#A3A3A3] font-body">{url}</p>
    </div>
  );
};

export default QRCode;
