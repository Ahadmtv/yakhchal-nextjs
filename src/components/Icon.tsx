import type { SVGProps } from "react";

export type IconName =
  | "arrow"
  | "calendar"
  | "check"
  | "close"
  | "download"
  | "email"
  | "instagram"
  | "linkedin"
  | "menu"
  | "moon"
  | "restaurant"
  | "shield"
  | "shopping"
  | "sparkle"
  | "sun"
  | "android"
  | "add"
  | "delete"
  | "reset"
  | "clock"
  | "external";

type Props = SVGProps<SVGSVGElement> & { name: IconName };

export default function Icon({ name, ...props }: Props) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.9,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" {...props}>
      {name === "arrow" && <path {...common} d="M19 12H5m6-6-6 6 6 6" />}
      {name === "calendar" && (
        <g {...common}><rect x="3" y="5" width="18" height="16" rx="3"/><path d="M8 3v4m8-4v4M3 10h18"/></g>
      )}
      {name === "check" && <path {...common} d="m5 12 4 4L19 6" />}
      {name === "close" && <path {...common} d="m6 6 12 12M18 6 6 18" />}
      {name === "download" && (
        <g {...common}><path d="M12 3v12m-5-5 5 5 5-5"/><path d="M5 20h14"/></g>
      )}
      {name === "email" && (
        <g {...common}><rect x="3" y="5" width="18" height="14" rx="3"/><path d="m4 7 8 6 8-6"/></g>
      )}
      {name === "instagram" && (
        <g {...common}><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.3" cy="6.7" r=".7" fill="currentColor" stroke="none"/></g>
      )}
      {name === "linkedin" && (
        <g fill="currentColor"><rect x="4" y="9" width="3" height="11" rx="1"/><circle cx="5.5" cy="5.5" r="1.8"/><path d="M10 9h3v1.5c1-1.2 2.2-1.8 3.8-1.8 3 0 4.2 2 4.2 5.3v6h-3v-5.4c0-1.9-.5-3-2.2-3-1.8 0-2.8 1.2-2.8 3.4v5h-3V9Z"/></g>
      )}
      {name === "menu" && <path {...common} d="M4 7h16M4 12h16M4 17h16" />}
      {name === "moon" && <path {...common} d="M20 15.2A8 8 0 1 1 8.8 4 6.5 6.5 0 0 0 20 15.2Z" />}
      {name === "sun" && (
        <g {...common}><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"/></g>
      )}
      {name === "restaurant" && (
        <g {...common}><path d="M7 3v7m-3-7v4a3 3 0 0 0 6 0V3M7 10v11M16 3v18M16 3c3 2 4 5 4 8h-4"/></g>
      )}
      {name === "shield" && <path {...common} d="M12 3 5 6v5c0 4.8 2.8 8.1 7 10 4.2-1.9 7-5.2 7-10V6l-7-3Zm-3 9 2 2 4-5" />}
      {name === "shopping" && (
        <g {...common}><path d="M6 8h12l1 13H5L6 8Z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></g>
      )}
      {name === "sparkle" && <path {...common} d="m12 3 1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6L12 3Zm6 11 .8 2.2L21 17l-2.2.8L18 20l-.8-2.2L15 17l2.2-.8L18 14Z" />}
      {name === "android" && (
        <g {...common}><path d="M7 9h10v9a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V9Z"/><path d="M8 9a4 4 0 0 1 8 0M9 5 7.5 3M15 5l1.5-2M5 10v6m14-6v6M9 20v2m6-2v2"/></g>
      )}
      {name === "add" && <path {...common} d="M12 5v14M5 12h14" />}
      {name === "delete" && (
        <g {...common}><path d="M5 7h14M9 7V4h6v3m2 0-1 14H8L7 7m3 4v6m4-6v6"/></g>
      )}
      {name === "reset" && <path {...common} d="M4 4v6h6M5.5 16a8 8 0 1 0 .5-8l-2 2" />}
      {name === "clock" && <g {...common}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></g>}
      {name === "external" && <g {...common}><path d="M14 4h6v6M20 4l-9 9"/><path d="M18 13v6H5V6h6"/></g>}
    </svg>
  );
}
