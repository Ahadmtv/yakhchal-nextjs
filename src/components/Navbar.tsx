"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState, type MouseEvent as ReactMouseEvent } from "react";
import Icon from "@/components/Icon";
import { assets } from "@/lib/assets";

const links = [
  { href: "/", label: "خانه", match: "/" },
  { href: "/features", label: "امکانات", match: "/features" },
  { href: "/calories", label: "کالری غذاها", match: "/calories" },
  { href: "/articles", label: "مجله سلامت", match: "/articles" },
  { href: "/#contact", label: "تماس با ما", match: "#contact" },
] as const;

function isActivePath(pathname: string, match: string): boolean {
  if (match === "/") return pathname === "/";
  if (match.startsWith("#")) return false;
  return pathname.startsWith(match);
}

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const frameRef = useRef<number | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const update = () => {
      if (frameRef.current !== null) return;
      frameRef.current = requestAnimationFrame(() => {
        const next = window.scrollY > 12;
        setScrolled((current) => (current === next ? current : next));
        frameRef.current = null;
      });
    };
    update();
    addEventListener("scroll", update, { passive: true });
    return () => {
      removeEventListener("scroll", update);
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const toggleTheme = useCallback(() => {
    const root = document.documentElement;
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    root.style.colorScheme = next;
    try {
      localStorage.setItem("yakhchal:theme", next);
    } catch {
      // Theme still changes when storage is unavailable.
    }
  }, []);

  const closeMenu = useCallback(() => setOpen(false), []);

  return (
    <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
      <div className="container">
        <div className="nav-surface">
          <Link className="brand" href="/" aria-label="یخچال، صفحه اصلی">
            <Image className="brand-logo" src={assets.logo} alt="" width={42} height={42} sizes="42px" loading="eager" />
            <span className="brand-wordmarks" aria-hidden="true">
              <Image className="wordmark wordmark-light" src={assets.wordmarkLight} alt="" width={110} height={48} sizes="106px" loading="eager" />
              <Image className="wordmark wordmark-dark" src={assets.wordmarkDark} alt="" width={110} height={48} sizes="106px" loading="eager" />
            </span>
            <span className="sr-only">یخچال</span>
          </Link>

          <nav className="desktop-nav" aria-label="ناوبری اصلی">
            {links.map((link) => {
              const active = isActivePath(pathname, link.match);
              return (
                <Link key={link.href} className={`nav-link${active ? " active" : ""}`} href={link.href} aria-current={active ? "page" : undefined}>
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="nav-actions">
            <button className="icon-button theme-toggle" type="button" onClick={toggleTheme} aria-label="تغییر حالت روشن و تیره">
              <Icon className="theme-icon theme-sun" name="sun" />
              <Icon className="theme-icon theme-moon" name="moon" />
            </button>
            <a className="button button-primary nav-download" href="/#download">
              <Icon name="download" />
              دریافت برنامه
            </a>
            <button className="icon-button mobile-menu-button" type="button" onClick={() => setOpen(true)} aria-label="بازکردن منوی اصلی" aria-expanded={open} aria-controls="mobile-navigation">
              <Icon name="menu" />
            </button>
          </div>
        </div>
      </div>

      <div className={`mobile-overlay${open ? " open" : ""}`} aria-hidden={!open} onMouseDown={(event: ReactMouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget) closeMenu();
      }}>
        <aside id="mobile-navigation" className="mobile-drawer" role="dialog" aria-modal="true" aria-label="منوی اصلی">
          <div className="drawer-head">
            <Link className="drawer-brand" href="/" onClick={closeMenu}>
              <Image src={assets.logo} alt="" width={38} height={38} sizes="38px" />
              <strong>یخچال</strong>
            </Link>
            <button ref={closeRef} className="icon-button" type="button" onClick={closeMenu} aria-label="بستن منوی اصلی">
              <Icon name="close" />
            </button>
          </div>
          <nav className="mobile-nav" aria-label="ناوبری موبایل">
            {links.map((link) => {
              const active = isActivePath(pathname, link.match);
              return (
                <Link key={link.href} className={`mobile-nav-link${active ? " active" : ""}`} href={link.href} onClick={closeMenu} aria-current={active ? "page" : undefined}>
                  {link.label}
                </Link>
              );
            })}
          </nav>
          <a className="button button-primary drawer-download" href="/#download" onClick={closeMenu}>
            <Icon name="download" />
            دریافت رایگان برنامه
          </a>
        </aside>
      </div>
    </header>
  );
}
