"use client";

import { ChatWidget } from "@/components/chat/ChatWidget";

export function ChatWidgetWrapper() {
  // Don't render on admin or API routes
  if (typeof window !== "undefined") {
    const path = window.location.pathname;
    if (path.startsWith("/admin") || path.startsWith("/api")) {
      return null;
    }
  }
  return <ChatWidget />;
}
