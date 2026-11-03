import I18nRtlDemo from "@demo/services/i18n-rtl/page";
import PermissionsDemo from "@demo/services/permissions/page";
import ShortcutsDemo from "@demo/services/shortcuts/page";
import UrlStateDemo from "@demo/services/url-state/page";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return [
    { topic: "i18n-rtl" },
    { topic: "permissions" },
    { topic: "shortcuts" },
    { topic: "url-state" },
  ];
}

export default async function ServicesDemoPage({
  params,
}: {
  params: Promise<{ topic: string }>;
}) {
  const { topic } = await params;

  switch (topic) {
    case "i18n-rtl":
      return <I18nRtlDemo />;
    case "permissions":
      return <PermissionsDemo />;
    case "shortcuts":
      return <ShortcutsDemo />;
    case "url-state":
      return <UrlStateDemo />;
    default:
      notFound();
  }
}
