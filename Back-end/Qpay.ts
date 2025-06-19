import express from "express";
import http from "http";
import WebSocket from "ws";
import { v4 as uuidv4 } from "uuid";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const scannedClients = new Map(); // UUID → WebSocket

// API to generate a QR session with UUID
app.post("/create-qr-session", (req, res) => {
  const qrId = uuidv4();
  res.json({ qrId });
});

// QR scanner hits this endpoint to trigger WebSocket
app.post("/scan/:qrId", (req, res) => {
  const { qrId } = req.params;
  const ws = scannedClients.get(qrId);
  if (ws) {
    ws.send(JSON.stringify({ scanned: true, qrId }));
    scannedClients.delete(qrId);
    res.json({ success: true });
  } else {
    res.status(404).json({ error: "QR not active" });
  }
});

// WebSocket connection setup
wss.on("connection", (ws, req) => {
  ws.on("message", (message) => {
    const { qrId } = JSON.parse(message);
    if (qrId) {
      scannedClients.set(qrId, ws);
    }
  });

  ws.on("close", () => {
    for (const [key, client] of scannedClients.entries()) {
      if (client === ws) scannedClients.delete(key);
    }
  });
});

server.listen(4000, () => {
  console.log("Server running on http://localhost:4000");
});
