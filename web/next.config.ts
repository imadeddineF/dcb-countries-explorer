import type { NextConfig } from "next";
import withBundleAnalyzer from "@next/bundle-analyzer";
import path from "path";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  transpilePackages: ["@dcb/shared"],
  turbopack: {
    root: path.join(__dirname, ".."),
  },
};

const bundleAnalyzer = withBundleAnalyzer({
  enabled: false,
  openAnalyzer: false,
});

export default bundleAnalyzer(withNextIntl(nextConfig));
