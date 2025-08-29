import { Plus, Minus, RotateCcw, Wifi, WifiOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useSocket } from "@/hooks/useSocket";

export function Counter() {
  const { counter, isConnected, lastUpdate, increment, decrement, reset } =
    useSocket();

  const formatTime = (date: Date | null) => {
    if (!date) return "Never";
    return date.toLocaleTimeString();
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-2">
            {isConnected ? (
              <Wifi className="h-5 w-5 text-green-500" />
            ) : (
              <WifiOff className="h-5 w-5 text-red-500" />
            )}
            <Badge variant={isConnected ? "default" : "destructive"}>
              {isConnected ? "Connected" : "Disconnected"}
            </Badge>
          </div>
          <CardTitle className="text-3xl font-bold">Project Counter</CardTitle>
          <p className="text-sm text-muted-foreground">
            Last updated: {formatTime(lastUpdate)}
          </p>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Counter Display */}
          <div className="text-center">
            <div className="text-4xl font-bold text-primary">{counter}</div>
            <p className="text-sm text-muted-foreground">
              {counter === 1 ? "project" : "projects"}
            </p>
          </div>

          {/* Control Buttons */}
          <div className="flex gap-3">
            <Button
              onClick={decrement}
              disabled={!isConnected}
              variant="outline"
              className="flex-1"
            >
              <Minus className="h-4 w-4 mr-2" />
              Decrease
            </Button>

            <Button
              onClick={increment}
              disabled={!isConnected}
              className="flex-1"
            >
              <Plus className="h-4 w-4 mr-2" />
              Increase
            </Button>
          </div>

          {/* Reset Button */}
          <Button
            onClick={reset}
            disabled={!isConnected}
            variant="destructive"
            className="w-full"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset Counter
          </Button>

          {/* Connection Status */}
          {!isConnected && (
            <Alert variant="destructive">
              <AlertDescription>
                Connecting to server... Please wait.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
