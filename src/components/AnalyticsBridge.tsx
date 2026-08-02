"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { trackEvent, type AnalyticsEventName } from "@/lib/analytics";

function pageViewEvent(pathname: string): { event: AnalyticsEventName; properties?: Record<string, string> } | null {
  if (pathname === "/") return { event: "view_home" };
  if (pathname === "/download") return { event: "view_download_page" };
  if (pathname.startsWith("/features/")) return { event: "view_feature_page", properties: { feature_name: pathname.split("/").at(-1) ?? "" } };
  if (pathname.startsWith("/articles/")) return { event: "view_article", properties: { article_slug: pathname.split("/").at(-1) ?? "" } };
  return null;
}

export default function AnalyticsBridge() {
  const pathname = usePathname();

  useEffect(() => {
    const view = pageViewEvent(pathname);
    if (view) trackEvent(view.event, view.properties);
    const query = new URLSearchParams(window.location.search);
    if (pathname === "/download" && query.get("source") === "qr") {
      trackEvent("scan_download_qr", { source: "desktop_qr" });
    }
  }, [pathname]);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target instanceof Element ? event.target.closest<HTMLElement>("[data-analytics-event]") : null;
      const eventName = target?.dataset.analyticsEvent as AnalyticsEventName | undefined;
      if (!target || !eventName) return;
      trackEvent(eventName, {
        source: target.dataset.analyticsSource,
        store: target.dataset.analyticsStore,
        feature_name: target.dataset.analyticsFeature,
        article_slug: target.dataset.analyticsArticle,
      });
    };
    const onToggle = (event: Event) => {
      const details = event.target instanceof HTMLDetailsElement ? event.target : null;
      if (details?.open && details.dataset.analyticsEvent === "open_faq") {
        trackEvent("open_faq", { source: details.dataset.analyticsSource });
      }
    };
    document.addEventListener("click", onClick);
    document.addEventListener("toggle", onToggle, true);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("toggle", onToggle, true);
    };
  }, []);

  return null;
}
