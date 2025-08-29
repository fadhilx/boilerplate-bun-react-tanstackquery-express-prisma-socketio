import { useEffect, useState, useCallback } from "react";
import { io, Socket } from "socket.io-client";

export interface CounterUpdate {
  value: number;
  timestamp: Date;
}

export function useSocket() {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [counter, setCounter] = useState<number>(0);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  // Initialize socket connection
  useEffect(() => {
    const newSocket = io("http://localhost:3001");
    setSocket(newSocket);

    // Connection events
    newSocket.on("connect", () => {
      setIsConnected(true);
      console.log("Connected to server");
    });

    newSocket.on("disconnect", () => {
      setIsConnected(false);
      console.log("Disconnected from server");
    });

    // Counter update events
    newSocket.on("counterUpdate", (data: CounterUpdate) => {
      setCounter(data.value);
      setLastUpdate(new Date(data.timestamp));
    });

    // Error handling
    newSocket.on("error", (error: string) => {
      console.error("Socket error:", error);
    });

    // Cleanup on unmount
    return () => {
      newSocket.close();
    };
  }, []);

  // Counter actions
  const increment = useCallback(() => {
    if (socket && isConnected) {
      socket.emit("increment");
    }
  }, [socket, isConnected]);

  const decrement = useCallback(() => {
    if (socket && isConnected) {
      socket.emit("decrement");
    }
  }, [socket, isConnected]);

  const reset = useCallback(() => {
    if (socket && isConnected) {
      socket.emit("reset");
    }
  }, [socket, isConnected]);

  return {
    counter,
    isConnected,
    lastUpdate,
    increment,
    decrement,
    reset,
  };
}
