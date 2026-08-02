import type { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnalyticsBridge from "@/components/AnalyticsBridge";
import MobileDownloadBar from "@/components/MobileDownloadBar";

export default function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">
        رفتن به محتوای اصلی
      </a>
      <AnalyticsBridge />
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        {children}
      </main>
      <MobileDownloadBar />
      <Footer />
    </div>
  );
}
