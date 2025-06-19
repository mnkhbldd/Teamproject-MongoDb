"use client";

import { useEffect, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

export const QrBooking = () => {
  const [qrId, setQrId] = useState<string | null>(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const getQrId = async () => {
      const res = await fetch(
        "https://teamproject-mongodb.onrender.com/create-qr-session",
        {
          method: "POST",
        }
      );
      const data = await res.json();
      setQrId(data.qrId);

      const socket = new WebSocket("wss://teamproject-mongodb.onrender.com");

      socket.onopen = () => {
        socket.send(JSON.stringify({ qrId: data.qrId }));
      };

      socket.onmessage = (event) => {
        const message = JSON.parse(event.data);
        if (message.scanned) {
          setScanned(true);
          socket.close();
        }
      };

      return () => socket.close();
    };

    getQrId();
  }, []);

  const qrScanLink = qrId
    ? `https://teamproject-mongodb.onrender.com/scan/${qrId}`
    : "";

  return (
    <div className="text-center p-4">
      <h2 className="text-2xl font-bold mb-4">Scan to Confirm Booking</h2>
      {qrId && !scanned ? (
        <>
          <QRCodeCanvas value={qrScanLink} size={250} />
          <p className="mt-2 text-sm text-gray-600">Scan with any QR scanner</p>
        </>
      ) : scanned ? (
        <p className="text-green-600 font-bold text-xl mt-4">
          ✅ Booking Confirmed
        </p>
      ) : (
        <p>Generating QR...</p>
      )}
    </div>
  );
};
