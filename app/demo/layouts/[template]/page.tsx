import SinglePaneDemo from "@demo/layouts/single-pane/page";
import MasterDetailDemo from "@demo/layouts/master-detail/page";
import ThreePaneDemo from "@demo/layouts/three-pane/page";
import SplitInfoPanelDemo from "@demo/layouts/split-info-panel/page";
import FullSplitDemo from "@demo/layouts/full-split/page";
import ObjectPageDemo from "@demo/layouts/object-page/page";
import SettingsLayoutDemo from "@demo/layouts/settings-layout/page";
import FocusLayoutDemo from "@demo/layouts/focus-layout/page";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return [
    { template: "single-pane" },
    { template: "master-detail" },
    { template: "three-pane" },
    { template: "split-info-panel" },
    { template: "full-split" },
    { template: "object-page" },
    { template: "settings-layout" },
    { template: "focus-layout" },
  ];
}

export default async function LayoutDemoPage({
  params,
}: {
  params: Promise<{ template: string }>;
}) {
  const { template } = await params;

  switch (template) {
    case "single-pane":
      return <SinglePaneDemo />;
    case "master-detail":
      return <MasterDetailDemo />;
    case "three-pane":
      return <ThreePaneDemo />;
    case "split-info-panel":
      return <SplitInfoPanelDemo />;
    case "full-split":
      return <FullSplitDemo />;
    case "object-page":
      return <ObjectPageDemo />;
    case "settings-layout":
      return <SettingsLayoutDemo />;
    case "focus-layout":
      return <FocusLayoutDemo />;
    default:
      notFound();
  }
}
