/** @typedef {{ name: string; score: number; rank?: number }} ScoreEntry */

/** @type {ScoreEntry[]} */
export let latestScores = [];

let lastFetch = 0;
const FETCH_COOLDOWN = 5000;

/**
 * Fetch scores from the server, but only if cooldown has expired.
 * Updates cache in background.
 */
export async function getScores() {
  const now = Date.now();

  // Return cached results if cooldown has not expired
  if (now - lastFetch < FETCH_COOLDOWN) return;

  try {
    const res = await fetch("/scores");
    if (!res.ok) throw new Error("Failed to fetch scores");

    const data = await res.json();

    latestScores = data.map(
      (/** @type {ScoreEntry} */ entry, /** @type {number} */ i) => ({
        ...entry,
        rank: i + 1,
      }),
    );

    lastFetch = now;
  } catch (err) {
    console.error("Error fetching scores:", err);
  }
}
