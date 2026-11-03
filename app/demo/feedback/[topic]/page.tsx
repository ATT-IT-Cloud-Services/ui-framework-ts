import ConfirmDialogsDemo from "@demo/feedback/confirm-dialogs/page";
import ActionBarsDemo from "@demo/feedback/action-bars/page";
import StatesDemo from "@demo/feedback/states/page";
import ToastsDemo from "@demo/feedback/toasts/page";
import PopoversDemo from "@demo/feedback/popovers/page";
import NotificationsDemo from "@demo/feedback/notifications/page";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return [
    { topic: "confirm-dialogs" },
    { topic: "action-bars" },
    { topic: "states" },
    { topic: "toasts" },
    { topic: "popovers" },
    { topic: "notifications" },
  ];
}

export default async function FeedbackDemoPage({
  params,
}: {
  params: Promise<{ topic: string }>;
}) {
  const { topic } = await params;

  switch (topic) {
    case "confirm-dialogs":
      return <ConfirmDialogsDemo />;
    case "action-bars":
      return <ActionBarsDemo />;
    case "states":
      return <StatesDemo />;
    case "toasts":
      return <ToastsDemo />;
    case "popovers":
      return <PopoversDemo />;
    case "notifications":
      return <NotificationsDemo />;
    default:
      notFound();
  }
}
