"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Icon from "@/components/Icon";

export default function MobileDownloadBar() {
  const pathname = usePathname();
  if (pathname === "/download") return null;

  return (
    <aside className="mobile-download-bar" aria-label="دسترسی سریع به دانلود">
      <span><strong>یخچال برای اندروید</strong><small>انتخاب فروشگاه دانلود</small></span>
      <Link
        className="button button-primary"
        href="/download"
        prefetch={false}
        data-analytics-event="click_download_mobile_sticky"
        data-analytics-source="mobile_sticky"
      >
        <Icon name="download" />نصب رایگان
      </Link>
    </aside>
  );
}
