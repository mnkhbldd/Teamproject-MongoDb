import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function ScanPage() {
  const router = useRouter();
  const { qrId } = router.query;
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    if (qrId) {
      fetch(`https://teamproject-mongodb.onrender.com/scan/${qrId}`, {
        method: "POST",
      })
        .then(() => setScanned(true))
        .catch(() => alert("Invalid or expired QR"));
    }
  }, [qrId]);

  return (
    <div className="text-center mt-10">
      {scanned ? (
        <p className="text-green-500 text-2xl">🎉 QR Scanned Successfully!</p>
      ) : (
        <p>Scanning...</p>
      )}
    </div>
  );
}
