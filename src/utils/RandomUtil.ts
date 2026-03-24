// Simple seeded RNG helper and pick utilities for smoke tests
export function createRng(seed?: number): () => number {
  if (seed !== undefined && !Number.isNaN(seed)) return mulberry32(seed | 0);
  return Math.random;
}

function mulberry32(a: number) {
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Pick two distinct indexes from [0..length-1] using provided rng
export function pickDistinctIndexes(length: number, rng: () => number, attemptsLimit = 10) {
  if (length <= 0) return { idxA: 0, idxB: 0 };
  const idxA = Math.floor(rng() * length);
  let idxB = Math.floor(rng() * length);
  if (length > 1) {
    let attempts = 0;
    while (idxB === idxA && attempts < attemptsLimit) {
      idxB = Math.floor(rng() * length);
      attempts++;
    }
    if (idxB === idxA) idxB = (idxA + 1) % length;
  }
  return { idxA, idxB };
}

export default { createRng, pickDistinctIndexes };
