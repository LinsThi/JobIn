/**
 * Deterministic id from arbitrary string parts (djb2 → base36).
 * Stable across sessions, so it is safe to use as a persisted key.
 */
export function hashId(...parts: (string | number | null | undefined)[]): string {
  const input = parts.map((part) => String(part ?? "")).join("|");

  let hash = 5381;

  for (let index = 0; index < input.length; index++) {
    hash = (hash * 33) ^ input.charCodeAt(index);
  }

  return (hash >>> 0).toString(36);
}
