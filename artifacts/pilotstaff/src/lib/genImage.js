// Shared helper for generating free AI images via Pollinations' Flux model
// (same engine as the Image Generator tool). URLs are idempotent on
// (prompt, model, seed) so they're stable and browser-cacheable — no image
// hosting, storage, or API key needed.
export function aiImage(prompt, seed, size = 800) {
  const params = new URLSearchParams({
    width: String(size),
    height: String(size),
    nologo: 'true',
    enhance: 'true',
    safe: 'true',
    model: 'flux',
    seed: String(seed),
  });
  return `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?${params.toString()}`;
}
