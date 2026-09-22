function sharp() {
  throw new Error("sharp is not available in Cloudflare Workers (images.unoptimized=true must be set).");
}
sharp.cache = () => sharp;
sharp.concurrency = () => 0;
sharp.counters = () => ({});
sharp.simd = () => false;
sharp.format = {};
sharp.interpolators = {};
sharp.versions = {};
export default sharp;
