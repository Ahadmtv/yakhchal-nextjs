import Image from "next/image";
import type { Route } from "next";
import Link from "next/link";
import Icon, { type IconName } from "@/components/Icon";
import { assets } from "@/lib/assets";

const footerLinks = [
  { label: "امکانات", href: "/features" },
  { label: "دانلود برنامه", href: "/download" },
  { label: "کالری غذاها", href: "/calories" },
  { label: "مجله سلامت", href: "/articles" },
  { label: "سؤالات متداول", href: "/#faq" },
  { label: "حریم خصوصی", href: "/privacy" },
  { label: "تماس با ما", href: "/#contact" },
  { label: "درباره یخچال", href: "/about" },
  { label: "شرایط استفاده", href: "/terms" },
] as const;

const socials: ReadonlyArray<{ label: string; href: string; icon: IconName }> = [
  { label: "ایمیل یخچال", href: "mailto:yakhchal.app@gmail.com", icon: "email" },
  { label: "اینستاگرام یخچال", href: "https://instagram.com/yakhchal.app", icon: "instagram" },
  { label: "لینکدین یخچال", href: "https://www.linkedin.com/company/yakhchal", icon: "linkedin" },
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link href="/" aria-label="یخچال، صفحه اصلی"><Image src={assets.logo} alt="" width={48} height={48} sizes="48px" /><Image src={assets.wordmarkDark} alt="یخچال" width={120} height={50} sizes="120px" /></Link>
            <p>همراه فارسی شما برای برنامه‌ریزی غذا، کالری‌شماری و خرید هوشمند.</p>
            <div className="footer-socials">{socials.map((item) => <a key={item.href} href={item.href} aria-label={item.label} target={item.href.startsWith("http") ? "_blank" : undefined} rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}><Icon name={item.icon} /></a>)}</div>
          </div>
          <div><h2>دسترسی سریع</h2><nav className="footer-links" aria-label="پیوندهای پایین صفحه">{footerLinks.map((link) => <Link key={link.href} href={link.href as Route}>{link.label}</Link>)}</nav></div>
        </div>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} یخچال؛ همه حقوق محفوظ است.</span><span>طراحی‌شده برای انتخاب‌های ساده‌تر و سالم‌تر</span></div>
      </div>
    </footer>
  );
}
