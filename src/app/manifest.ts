import type { MetadataRoute } from "next";
import { assets } from "@/lib/assets";
export default function manifest(): MetadataRoute.Manifest { return { name: "یخچال - مدیریت تغذیه", short_name: "یخچال", description: "برنامه غذایی، کالری‌شمار و لیست خرید هوشمند", start_url: "/", display: "standalone", background_color: "#081510", theme_color: "#4F8F32", lang: "fa", dir: "rtl", icons: [{ src: assets.icon192, sizes: "192x192", type: "image/png" }, { src: assets.icon512, sizes: "512x512", type: "image/png" }] }; }
