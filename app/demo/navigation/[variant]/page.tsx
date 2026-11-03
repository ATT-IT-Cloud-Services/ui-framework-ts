import SidebarFullDemo from "@demo/navigation/sidebar-full/page";
import SidebarRailDemo from "@demo/navigation/sidebar-rail/page";
import SidebarHybridDemo from "@demo/navigation/sidebar-hybrid/page";
import SidebarDualDemo from "@demo/navigation/sidebar-dual/page";
import SidebarInsetDemo from "@demo/navigation/sidebar-inset/page";
import TopnavDemo from "@demo/navigation/topnav/page";
import BottomNavDemo from "@demo/navigation/bottom-nav/page";
import PositionEndDemo from "@demo/navigation/position-end/page";
import PositionBottomDemo from "@demo/navigation/position-bottom/page";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return [
    { variant: "sidebar-full" },
    { variant: "sidebar-rail" },
    { variant: "sidebar-hybrid" },
    { variant: "sidebar-dual" },
    { variant: "sidebar-inset" },
    { variant: "topnav" },
    { variant: "bottom-nav" },
    { variant: "position-end" },
    { variant: "position-bottom" },
  ];
}

export default async function NavigationDemoPage({
  params,
}: {
  params: Promise<{ variant: string }>;
}) {
  const { variant } = await params;

  switch (variant) {
    case "sidebar-full":
      return <SidebarFullDemo />;
    case "sidebar-rail":
      return <SidebarRailDemo />;
    case "sidebar-hybrid":
      return <SidebarHybridDemo />;
    case "sidebar-dual":
      return <SidebarDualDemo />;
    case "sidebar-inset":
      return <SidebarInsetDemo />;
    case "topnav":
      return <TopnavDemo />;
    case "bottom-nav":
      return <BottomNavDemo />;
    case "position-end":
      return <PositionEndDemo />;
    case "position-bottom":
      return <PositionBottomDemo />;
    default:
      notFound();
  }
}
