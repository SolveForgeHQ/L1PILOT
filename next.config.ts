import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  // react-markdown v9+ and remark-gfm v4+ are ESM-only packages.
  // Next.js requires them listed here so the bundler can transpile them.
  transpilePackages: [
    "react-markdown",
    "remark-gfm",
    "remark-parse",
    "remark-rehype",
    "unified",
    "bail",
    "is-plain-obj",
    "trough",
    "vfile",
    "vfile-message",
    "unist-util-stringify-position",
    "mdast-util-from-markdown",
    "mdast-util-to-hast",
    "mdast-util-gfm",
    "micromark",
    "micromark-extension-gfm",
    "rehype-react",
    "hast-util-to-jsx-runtime",
    "hast-util-whitespace",
    "property-information",
    "space-separated-tokens",
    "comma-separated-tokens",
    "unist-util-visit",
    "unist-util-is",
    "estree-util-is-identifier-name",
  ],
  serverExternalPackages: ["sharp"],
  webpack: (config) => {
    config.externals = [...(config.externals || []), "sharp"];
    return config;
  },
  turbopack: {},
};

export default nextConfig;
