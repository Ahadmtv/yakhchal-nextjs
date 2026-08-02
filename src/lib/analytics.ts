export type AnalyticsEventName =
  | "view_home"
  | "view_download_page"
  | "view_feature_page"
  | "view_article"
  | "use_calorie_calculator"
  | "complete_calorie_calculation"
  | "click_download_bazaar"
  | "click_download_myket"
  | "click_download_mobile_sticky"
  | "scan_download_qr"
  | "click_hero_primary_cta"
  | "click_article_install_cta"
  | "click_calorie_install_cta"
  | "click_feature_install_cta"
  | "open_faq"
  | "click_support";

export type AnalyticsProperties = Readonly<Record<string, string | number | boolean | undefined>>;

type DataLayerWindow = Window & { dataLayer?: Array<Record<string, unknown>> };

export function trackEvent(event: AnalyticsEventName, properties: AnalyticsProperties = {}): void {
  if (typeof window === "undefined") return;
  const payload = {
    event,
    page_path: window.location.pathname,
    device_type: window.matchMedia("(max-width: 699px)").matches ? "mobile" : "desktop",
    ...properties,
  };

  // No analytics vendor is installed. This in-memory layer and CustomEvent let a
  // future consent-aware provider subscribe without recording food or health data.
  const analyticsWindow = window as DataLayerWindow;
  analyticsWindow.dataLayer ??= [];
  analyticsWindow.dataLayer.push(payload);
  window.dispatchEvent(new CustomEvent("yakhchal:analytics", { detail: payload }));
}
