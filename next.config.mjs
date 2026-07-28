import withBundleAnalyzerFactory from "@next/bundle-analyzer";

const withBundleAnalyzer = withBundleAnalyzerFactory({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  reactCompiler: true,
  typedRoutes: true,
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [60, 75, 85],
    minimumCacheTTL: 2_678_400,
    deviceSizes: [360, 480, 640, 750, 828, 1080, 1200, 1440, 1920],
    imageSizes: [32, 48, 64, 80, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        pathname: "/Ahadmtv/ui-generator/main/**",
      },
    ],
    maximumRedirects: 0,
    maximumResponseBody: 10_000_000,
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
        ],
      },
    ];
  },
};

export default withBundleAnalyzer(nextConfig);
