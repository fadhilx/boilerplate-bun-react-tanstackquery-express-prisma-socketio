import express from "express";
import cors from "cors";
import { createServer } from "http";
import { config } from "dotenv";
import { SocketManager } from "./utils/socket";
import { initializeDatabase } from "./utils/database";

// Load environment variables
config();

const app = express();
const server = createServer(app);
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Socket.IO
const socketManager = new SocketManager(server);

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

// Get current counter value
app.get("/api/counter", async (req, res) => {
  try {
    const { prisma } = await import("./utils/database");
    const counter = await prisma.counter.findFirst();
    res.json({ value: counter?.value || 0 });
  } catch (error) {
    console.error("Error fetching counter:", error);
    res.status(500).json({ error: "Failed to fetch counter" });
  }
});

// Start server
async function startServer() {
  try {
    // Initialize database
    await initializeDatabase();

    server.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📊 Counter API: http://localhost:${PORT}/api/counter`);
      console.log(`🔌 WebSocket: ws://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();
