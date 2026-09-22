import { defineCloudflareConfig } from "@opennextjs/cloudflare";

const config = defineCloudflareConfig();

// Externalize sharp to prevent Cloudflare bundler from packaging native .node binaries
config.edgeExternals = [...(config.edgeExternals ?? []), "sharp"];

export default config;
