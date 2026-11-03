"use client";

import * as React from "react";
import { AppShell, PageHeader } from "@fw/shell";
import {
  LiveValue,
  LiveBadge,
  StaleDataIndicator,
  AlarmList,
  AlarmBanner,
  StatusIndicator,
  Sparkline,
  ShiftModeToggle,
  ConfirmHold,
  TimeRangePicker,
} from "@fw/realtime";
import { Card, CardHeader, CardTitle, CardContent } from "@fw/ui";
import { toast } from "@fw/overlays";
import { DemoFrame } from "../../_shared/DemoFrame";
import { MOCK_ALARMS } from "../../_shared/mock-data/alarms";
import { DEMO_NAVIGATION_ITEMS } from "../../_shared/navigation";
import { preset } from "./preset";

export function OperatorConsoleDemo() {
  const [alarms, setAlarms] = React.useState(MOCK_ALARMS);
  const [showCriticalBanner, setShowCriticalBanner] = React.useState(true);
  const [rpm, setRpm] = React.useState(1498.2);
  const [temp, setTemp] = React.useState(98.4);
  const [sparklineData, setSparklineData] = React.useState([96, 96.5, 97, 97.2, 98.0, 98.4]);

  // Simulate live data fluctuations
  React.useEffect(() => {
    const timer = setInterval(() => {
      const deltaRpm = (Math.random() - 0.5) * 1.5;
      const deltaTemp = (Math.random() - 0.48) * 0.4;
      setRpm((prev) => Number((prev + deltaRpm).toFixed(1)));
      setTemp((prev) => {
        const next = Number((prev + deltaTemp).toFixed(1));
        setSparklineData((arr) => [...arr.slice(1), next]);
        return next;
      });
    }, 1500);

    return () => clearInterval(timer);
  }, []);

  return (
    <DemoFrame
      demoId="realtime-operator-console"
      title="Operator SCADA & Live Telemetry Console"
      description="Cyber-physical operations layout: live data streams, quality indicators, alarm management, high-contrast shift mode, and press-and-hold safety confirmations."
      folderPath="demo/realtime/operator-console/"
      preset={preset}
    >
      <AppShell navigationItems={DEMO_NAVIGATION_ITEMS}>
        <div className="space-y-4">
          {showCriticalBanner && (
            <AlarmBanner
              source="Turbine-04"
              message="Rotor bearing temperature critical (98.4°C)."
              timestamp="Just now"
              onAcknowledge={() => {
                setShowCriticalBanner(false);
                toast.success("Critical alarm acknowledged.");
              }}
            />
          )}

          <PageHeader
            title="Turbine Cluster 04 — Mission Operations Console"
            subtitle="Live SCADA telemetry gateway streaming at 50 Hz from Siemens Energy ST-60 units."
            badge={<LiveBadge isLive />}
            actions={
              <div className="flex items-center gap-2 flex-wrap">
                <TimeRangePicker />
                <ShiftModeToggle />
              </div>
            }
          />

          {/* Quick status bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3 rounded-lg border border-border bg-card">
            <StatusIndicator status="ok" label="Primary Core: OK" />
            <StatusIndicator status="warn" label="Bearing: Warn" />
            <StatusIndicator status="ok" label="Inlet Valve: OK" />
            <div className="flex items-center justify-end">
              <StaleDataIndicator isStale={false} />
            </div>
          </div>

          {/* Primary Telemetry Instruments */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="p-3 pb-1">
                <CardTitle className="text-2xs uppercase text-muted-foreground">
                  Rotor Shaft Velocity
                </CardTitle>
              </CardHeader>
              <CardContent className="p-3 pt-0">
                <LiveValue value={rpm} unit="RPM" trend="stable" precision={1} />
                <div className="text-2xs text-muted-foreground pt-1">Target: 1,500.0 RPM</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="p-3 pb-1">
                <CardTitle className="text-2xs uppercase text-muted-foreground">
                  Bearing Thermal Sensor
                </CardTitle>
              </CardHeader>
              <CardContent className="p-3 pt-0">
                <LiveValue value={temp} unit="°C" trend="up" quality="uncertain" precision={1} />
                <div className="pt-2">
                  <Sparkline data={sparklineData} color="#ea580c" width={160} height={22} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="p-3 pb-1">
                <CardTitle className="text-2xs uppercase text-muted-foreground">
                  Hydraulic Pressure
                </CardTitle>
              </CardHeader>
              <CardContent className="p-3 pt-0">
                <LiveValue value={4.2} unit="bar" trend="stable" precision={1} />
                <div className="text-2xs text-muted-foreground pt-1">Nominal: 4.0 - 4.5 bar</div>
              </CardContent>
            </Card>

            <Card className="flex flex-col justify-between">
              <CardHeader className="p-3 pb-1">
                <CardTitle className="text-2xs uppercase text-muted-foreground">
                  Emergency Breaker
                </CardTitle>
              </CardHeader>
              <CardContent className="p-3 pt-0">
                <ConfirmHold
                  label="Hold to Trip Breaker"
                  variant="destructive"
                  holdDurationMs={1500}
                  onConfirm={() => toast.error("Emergency turbine breaker tripped!")}
                />
              </CardContent>
            </Card>
          </div>

          {/* Live Alarms List */}
          <Card>
            <CardHeader className="p-4 pb-2 border-b border-border">
              <CardTitle className="text-xs font-semibold">Active SCADA Alarms</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <AlarmList
                alarms={alarms}
                onAcknowledge={(id) => {
                  setAlarms((prev) =>
                    prev.map((a) => (a.id === id ? { ...a, acknowledged: true } : a))
                  );
                  toast.success("Alarm acknowledged");
                }}
                onShelve={(id) => {
                  setAlarms((prev) =>
                    prev.map((a) => (a.id === id ? { ...a, shelved: true } : a))
                  );
                  toast.info("Alarm shelved for 2h");
                }}
              />
            </CardContent>
          </Card>
        </div>
      </AppShell>
    </DemoFrame>
  );
}

export default OperatorConsoleDemo;
