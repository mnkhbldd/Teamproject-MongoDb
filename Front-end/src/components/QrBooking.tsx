"use client";

import { useEffect, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import axiosInstance from "@/utils/axios";

export const QrBooking = () => {
  const [qrId, setQrId] = useState<string | null>(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const createQrSession = async () => {
      try {
        // Step 1: Request a new QR session from backend
        const res = await axiosInstance.post("/qr/create-qr-session");
        const qrIdFromServer = res.data.qrId;
        setQrId(qrIdFromServer);

        // Step 2: Open WebSocket connection
        const socket = new WebSocket("wss://teamproject-mongodb.onrender.com");

        socket.onopen = () => {
          // Send QR ID immediately after opening connection
          socket.send(JSON.stringify({ qrId: qrIdFromServer }));
        };

        socket.onmessage = (event) => {
          const message = JSON.parse(event.data);
          if (message.scanned) {
            setScanned(true);
            socket.close(); // Close after success
          }
        };

        socket.onerror = (err) => {
          console.error("WebSocket error:", err);
        };

        return () => socket.close(); // Clean up on unmount
      } catch (error) {
        console.error("Failed to create QR session", error);
      }
    };

    createQrSession();
  }, []);

  const qrUrl = qrId
    ? `https://teamproject-mongodb.onrender.com/qr/scan/${qrId}`
    : "";

  return (
    <div className="text-center p-6">
      <h2 className="text-xl font-bold mb-4">Scan QR to Confirm</h2>

      {scanned ? (
        <p className="text-green-600 font-semibold text-lg mt-4">
          ✅ Booking Confirmed
        </p>
      ) : qrId ? (
        <>
          <QRCodeCanvas value={qrUrl} size={256} />
          <p className="mt-2 text-gray-500 text-sm">
            Scan with your phone to confirm
          </p>
        </>
      ) : (
        <p className="text-gray-500">Generating QR...</p>
      )}
    </div>
  );
};
