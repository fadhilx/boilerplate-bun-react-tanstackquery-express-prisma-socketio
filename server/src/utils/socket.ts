import { Server as SocketIOServer } from "socket.io";
import { Server as HTTPServer } from "http";
import { prisma } from "./database";

export interface CounterUpdate {
  value: number;
  timestamp: Date;
}

export class SocketManager {
  private io: SocketIOServer;

  constructor(server: HTTPServer) {
    const allowedOrigins = [
      process.env.CLIENT_URL || "http://localhost:5173",
      "http://localhost:3000",
    ];

    console.log("🔌 Socket.IO CORS origins:", allowedOrigins);

    this.io = new SocketIOServer(server, {
      cors: {
        origin: allowedOrigins,
        methods: ["GET", "POST"],
        credentials: true,
      },
    });

    this.setupEventHandlers();
  }

  private setupEventHandlers() {
    this.io.on("connection", (socket) => {
      console.log(`✅ Client connected: ${socket.id}`);

      // Send current counter value to newly connected client
      this.sendCurrentCounter(socket);

      // Handle counter increment
      socket.on("increment", async () => {
        await this.handleIncrement(socket);
      });

      // Handle counter decrement
      socket.on("decrement", async () => {
        await this.handleDecrement(socket);
      });

      // Handle counter reset
      socket.on("reset", async () => {
        await this.handleReset(socket);
      });

      socket.on("disconnect", () => {
        console.log(`❌ Client disconnected: ${socket.id}`);
      });
    });
  }

  private async sendCurrentCounter(socket: any) {
    try {
      const counter = await prisma.counter.findFirst();
      if (counter) {
        socket.emit("counterUpdate", {
          value: counter.value,
          timestamp: counter.updatedAt,
        });
      }
    } catch (error) {
      console.error("Error sending current counter:", error);
    }
  }

  private async handleIncrement(socket: any) {
    try {
      const counter = await prisma.counter.findFirst();
      if (counter) {
        const updatedCounter = await prisma.counter.update({
          where: { id: counter.id },
          data: { value: counter.value + 1 },
        });

        const update: CounterUpdate = {
          value: updatedCounter.value,
          timestamp: updatedCounter.updatedAt,
        };

        // Broadcast to all clients
        this.io.emit("counterUpdate", update);
        console.log(`Counter incremented to: ${updatedCounter.value}`);
      }
    } catch (error) {
      console.error("Error incrementing counter:", error);
      socket.emit("error", "Failed to increment counter");
    }
  }

  private async handleDecrement(socket: any) {
    try {
      const counter = await prisma.counter.findFirst();
      if (counter) {
        const updatedCounter = await prisma.counter.update({
          where: { id: counter.id },
          data: { value: Math.max(0, counter.value - 1) },
        });

        const update: CounterUpdate = {
          value: updatedCounter.value,
          timestamp: updatedCounter.updatedAt,
        };

        // Broadcast to all clients
        this.io.emit("counterUpdate", update);
        console.log(`Counter decremented to: ${updatedCounter.value}`);
      }
    } catch (error) {
      console.error("Error decrementing counter:", error);
      socket.emit("error", "Failed to decrement counter");
    }
  }

  private async handleReset(socket: any) {
    try {
      const counter = await prisma.counter.findFirst();
      if (counter) {
        const updatedCounter = await prisma.counter.update({
          where: { id: counter.id },
          data: { value: 0 },
        });

        const update: CounterUpdate = {
          value: updatedCounter.value,
          timestamp: updatedCounter.updatedAt,
        };

        // Broadcast to all clients
        this.io.emit("counterUpdate", update);
        console.log("Counter reset to: 0");
      }
    } catch (error) {
      console.error("Error resetting counter:", error);
      socket.emit("error", "Failed to reset counter");
    }
  }

  public getIO() {
    return this.io;
  }
}
