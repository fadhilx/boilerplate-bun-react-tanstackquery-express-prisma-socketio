import React from "react";
import { Plus, Minus, RotateCcw, Wifi, WifiOff } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { useSocket } from "../hooks/useSocket";

export function Counter() {
  const { counter, isConnected, lastUpdate, increment, decrement, reset } =
    useSocket();

  const formatTime = (date: Date | null) => {
    if (!date) return "Never";
    return date.toLocaleTimeString();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-2">
            {isConnected ? (
              <Wifi className="h-5 w-5 text-green-500" />
            ) : (
              <WifiOff className="h-5 w-5 text-red-500" />
            )}
            <span
              className={`text-sm ${
                isConnected ? "text-green-600" : "text-red-600"
              }`}
            >
              {isConnected ? "Connected" : "Disconnected"}
            </span>
          </div>
          <CardTitle className="text-3xl font-bold text-gray-800">
            Project Counter
          </CardTitle>
          <p className="text-sm text-gray-600">
            Last updated: {formatTime(lastUpdate)}
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Counter Display */}
          <div className="text-center">
            <div className="text-6xl font-bold text-indigo-600 mb-2">
              {counter}
            </div>
            <p className="text-sm text-gray-500">
              {counter === 1 ? "project" : "projects"}
            </p>
          </div>

          {/* Control Buttons */}
          <div className="flex space-x-3">
            <Button
              onClick={decrement}
              disabled={!isConnected}
              variant="outline"
              size="lg"
              className="flex-1 h-12 text-lg"
            >
              <Minus className="h-5 w-5 mr-2" />
              Decrease
            </Button>

            <Button
              onClick={increment}
              disabled={!isConnected}
              size="lg"
              className="flex-1 h-12 text-lg"
            >
              <Plus className="h-5 w-5 mr-2" />
              Increase
            </Button>
          </div>

          {/* Reset Button */}
          <Button
            onClick={reset}
            disabled={!isConnected}
            variant="destructive"
            className="w-full h-12 text-lg"
          >
            <RotateCcw className="h-5 w-5 mr-2" />
            Reset Counter
          </Button>

          {/* Connection Status */}
          {!isConnected && (
            <div className="text-center p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800">
                Connecting to server... Please wait.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
