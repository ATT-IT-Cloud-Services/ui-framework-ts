"use client";

import * as React from "react";
import {
  Activity,
  Zap,
  Package,
  Server,
  Layers,
  ArrowRight,
} from "lucide-react";
import { PageHeader } from "@fw/shell";
import { StatCard, StatusBadge } from "@fw/panels";
import { LiveValue, LiveBadge, AlarmList, Sparkline } from "@fw/realtime";
import { Button, Card, CardHeader, CardTitle, CardContent } from "@fw/ui";
import { MOCK_ORDERS } from "../mock-data/orders";
import { MOCK_ALARMS } from "../mock-data/alarms";
import Link from "next/link";

export function DashboardPage() {
  const [alarms, setAlarms] = React.useState(MOCK_ALARMS);
  const [gridOutput, setGridOutput] = React.useState(482.6);
  const [rpm, setRpm] = React.useState(1498.4);
  const [bearingTemp, setBearingTemp] = React.useState(98.4);
  const [vibration, setVibration] = React.useState(3.8);
  const [lastTick, setLastTick] = React.useState("Just now");

  // Background info-points streaming ticker (simulates live web app background updates)
  React.useEffect(() => {
    const timer = setInterval(() => {
      setGridOutput((prev) => Number((prev + (Math.random() - 0.49) * 0.4).toFixed(1)));
      setRpm((prev) => Number((prev + (Math.random() - 0.5) * 1.2).toFixed(1)));
      setBearingTemp((prev) => Number((prev + (Math.random() - 0.48) * 0.2).toFixed(1)));
      setVibration((prev) => Number((prev + (Math.random() - 0.5) * 0.1).toFixed(1)));
      setLastTick(new Date().toLocaleTimeString());
    }, 2000);

    return () => clearInterval(timer);
  }, []);

  const handleAcknowledge = (id: string) => {
    setAlarms((prev) =>
      prev.map((a) => (a.id === id ? { ...a, acknowledged: true } : a))
    );
  };

  const handleShelve = (id: string) => {
    setAlarms((prev) =>
      prev.map((a) => (a.id === id ? { ...a, shelved: true } : a))
    );
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Plant Operations & Fleet Telemetry"
        subtitle={`Real-time sensor telemetry streaming in background. Live tick: ${lastTick}`}
        badge={<LiveBadge isLive />}
        actions={
          <div className="flex items-center gap-2">
            <span className="text-2xs text-muted-foreground font-mono hidden sm:inline">
              ● Stream: 50 Hz Background
            </span>
            <Button variant="outline" size="sm" className="text-xs">
              Export Telemetry
            </Button>
            <Button size="sm" className="text-xs font-semibold">
              Live Console
            </Button>
          </div>
        }
      />

      {/* KPI Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Active Dispatch Volume"
          value="€142,850"
          subtitle="Orders in fulfillment"
          trend={{ value: "+12.4%", direction: "up", label: "vs last month" }}
          icon={Package}
        >
          <div className="pt-2">
            <Sparkline
              data={[45, 52, 48, 62, 59, 74, 82, 88]}
              color="#16a34a"
              width={140}
              height={20}
            />
          </div>
        </StatCard>

        <StatCard
          title="Turbine Grid Output"
          value={`${gridOutput} MW`}
          subtitle="98.2% operating efficiency"
          trend={{ value: "+3.1%", direction: "up" }}
          icon={Zap}
        >
          <div className="pt-2">
            <Sparkline
              data={[420, 440, 460, 455, 470, gridOutput]}
              color="#0064d9"
              width={140}
              height={20}
            />
          </div>
        </StatCard>

        <StatCard
          title="Telemetry Sensor Health"
          value="99.94%"
          subtitle="1,420 sensors online"
          trend={{ value: "-0.02%", direction: "neutral" }}
          icon={Activity}
        />

        <StatCard
          title="Active System Alarms"
          value={String(alarms.filter((a) => !a.acknowledged).length)}
          subtitle="Requiring operator review"
          trend={{ value: "2 critical", direction: "down" }}
          icon={Server}
        />
      </div>

      {/* Real-time telemetry monitoring bar */}
      <Card className="border-border shadow-2xs">
        <CardHeader className="p-4 pb-2 border-b border-border/60 flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="h-4 w-4 text-primary" />
            <CardTitle className="text-xs font-semibold">
              Live Turbine Cluster Diagnostics
            </CardTitle>
          </div>
          <span className="text-2xs text-muted-foreground font-mono">Stream: 50 Hz</span>
        </CardHeader>
        <CardContent className="p-4 grid grid-cols-2 sm:grid-cols-4 gap-6">
          <LiveValue label="Rotor Speed (RPM)" value={rpm} unit="RPM" trend="stable" />
          <LiveValue label="Bearing Temp" value={bearingTemp} unit="°C" trend="up" quality="uncertain" />
          <LiveValue label="Lubrication Pressure" value={4.2} unit="bar" trend="stable" />
          <LiveValue label="Vibration Harmonic" value={vibration} unit="mm/s" trend="down" />
        </CardContent>
      </Card>

      {/* Grid: Live Alarms + Recent Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Alarms */}
        <Card className="border-border shadow-2xs">
          <CardHeader className="p-4 pb-3 border-b border-border/60 flex flex-row items-center justify-between">
            <CardTitle className="text-xs font-semibold flex items-center gap-2">
              <span>Mission Critical Alarms</span>
            </CardTitle>
            <span className="text-2xs text-muted-foreground">{alarms.length} events logged</span>
          </CardHeader>
          <CardContent className="p-4">
            <AlarmList
              alarms={alarms}
              onAcknowledge={handleAcknowledge}
              onShelve={handleShelve}
            />
          </CardContent>
        </Card>

        {/* Recent Dispatch Orders */}
        <Card className="border-border shadow-2xs">
          <CardHeader className="p-4 pb-3 border-b border-border/60 flex flex-row items-center justify-between">
            <CardTitle className="text-xs font-semibold">Recent Fulfillment Orders</CardTitle>
            <Button variant="ghost" size="sm" asChild className="text-2xs h-6 gap-1">
              <Link href="/demo/layouts/master-detail">
                <span>View all</span>
                <ArrowRight className="h-3 w-3" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="p-4 space-y-2">
            {MOCK_ORDERS.slice(0, 4).map((ord) => (
              <div
                key={ord.id}
                className="flex items-center justify-between p-2.5 rounded-lg border border-border/60 bg-muted/20 hover:bg-muted/40 transition-colors text-xs"
              >
                <div className="flex flex-col min-w-0">
                  <span className="font-semibold text-foreground truncate">{ord.customerName}</span>
                  <span className="text-2xs text-muted-foreground font-mono">
                    {ord.orderNumber} • {ord.destination}
                  </span>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="font-mono font-semibold text-foreground">
                    €{ord.amount.toLocaleString()}
                  </span>
                  <StatusBadge status={ord.status} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
