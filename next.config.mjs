/** @type {import('next').NextConfig} */
import createMDX from "@next/mdx";
import withPWAInit from "@ducanh2912/next-pwa";

// @ts-check
import withSerwistInit from "@serwist/next";

const withPWA = withPWAInit({
  dest: "public",
});
const withSerwist = withSerwistInit({
  // cacheOnFrontEndNav: true,
  swSrc: "src/sw.ts", // add the path where you create sw.ts
  swDest: "public/sw.js",
  reloadOnOnline: true,
  // disable: process.env.NODE_ENV === "development", // to disable pwa in development
  // ... other options
});

const nextConfig = {
  swcMinify: true,
  reactStrictMode: true,
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
};

const withMDX = createMDX({
  // Add markdown plugins here, as desired
});

export default withPWA(withMDX(nextConfig));
