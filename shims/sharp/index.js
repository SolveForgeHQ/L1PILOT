"use strict";
function sharp() {
  throw new Error("sharp is not available in Cloudflare Workers (images.unoptimized=true must be set).");
}
sharp.cache = function() { return sharp; };
sharp.concurrency = function() { return 0; };
sharp.counters = function() { return {}; };
sharp.simd = function() { return false; };
sharp.format = {};
sharp.interpolators = {};
sharp.versions = {};
module.exports = sharp;
module.exports.default = sharp;
