const canvasEl = /** @type {HTMLCanvasElement} */ (
  document.getElementById("game")
);

if (!canvasEl) throw new Error("Canvas not found");

const ctxEl = canvasEl.getContext("2d");

if (!ctxEl) throw new Error("2D context not available");

console.log(canvasEl);
console.log(ctxEl);

// Resolution control
const TILE_SIZE = 20;

// The game is a state machine. These are the states
export const STATES = Object.freeze({
  MENU: 0,
  GAME: 1,
  SCORE: 2,
});

export const DIRECTIONS = Object.freeze({
  UP: 0,
  RIGHT: 1,
  DOWN: 2,
  LEFT: 3,
});

// Engine variables and constants
export const engine = {
  // The canvas object in the browser
  canvas: canvasEl,

  // Context for the canvas (this is where the game is drawn)
  ctx: ctxEl,

  // Always start on the menu
  /** @type {0 | 1 | 2} */
  gameState: STATES.MENU,

  // Game grid, controlled by TITLE_SIZE
  grid: {
    cols: canvasEl.width / TILE_SIZE,
    rows: canvasEl.height / TILE_SIZE,
  },

  // Default settings
  defaults: Object.freeze({
    snakeLength: 2,
    startDirection: DIRECTIONS.RIGHT,
  }),

  // Engine speed
  tickrate: 5,

  // Framerate
  fps: 0,

  // Timestamp of previous frame
  lastTime: 0,

  // Collect time until the next tick happens
  accumulator: 0,

  // Direction the snake is going
  direction: DIRECTIONS.RIGHT,

  // Score for the current session
  score: 0,

  // Difficulty selected (easy, medium, hard, insane)
  difficulty: "medium",

  // If the game is paused
  paused: false,
};

// User settings
export const defaultSettings = {
  snakeColor: "green",
  gridLines: true,
  warpWalls: false,
  soundVolume: 80,
  soundMute: false,
  musicVolume: 80,
  musicMute: false,
  showFPS: true,
};

/** @type {Partial<Record<keyof Settings, any>>} */
const SETTINGS_RULES = {
  snakeColor: ["green", "red", "blue", "yellow", "white"],
  soundVolume: { min: 0, max: 100 },
  musicVolume: { min: 0, max: 100 },
};

/**
 * @typedef {typeof defaultSettings} Settings
 */

export let settings = { ...defaultSettings };

/**
 * Validate settings
 *
 * @param {Partial<Settings>} obj
 * @returns {Settings}
 */
function validateSettings(obj) {
  /** @type {Settings} */
  const result = { ...defaultSettings };

  /** @type {Array<keyof Settings>} */
  const keys = /** @type {Array<keyof Settings>} */ (
    Object.keys(defaultSettings)
  );

  for (const key of keys) {
    if (!(key in obj)) continue;

    const value = obj[key];
    const def = defaultSettings[key];

    // Type check
    if (typeof value !== typeof def) {
      console.warn(`Invalid type for setting "${key}", using default`);
      continue;
    }

    // Semantic rules
    const rule = SETTINGS_RULES[key];

    // Enum rule
    if (Array.isArray(rule)) {
      if (!rule.includes(value)) {
        console.warn(`Invalid value for "${key}", using default`);
        continue;
      }
    }

    // Numeric range rule
    else if (rule && typeof rule === "object") {
      if (typeof value !== "number") continue; // type guard (already checked before, but vtsls is super picky)
      if (typeof value !== "number" || value < rule.min || value > rule.max) {
        const clamped = Math.min(rule.max, Math.max(rule.min, value));
        /** @type {any} */ (result)[key] = clamped;
        continue;
      }
    }
    /** @type {any} */ (result)[key] = value;
  }

  return result;
}

/**
 * Loads save settings from local storage
 * */
export function loadSettings() {
  const raw = localStorage.getItem("snakeGameSettings");

  if (!raw) {
    // First run → persist defaults
    settings = { ...defaultSettings };
    saveSettings();
    return;
  }

  try {
    const parsed = JSON.parse(raw);
    settings = validateSettings(parsed);
  } catch (err) {
    console.warn("Failed to parse settings, using defaults", err);
    settings = { ...defaultSettings };
  }
}

/**
 * Save current settings to localStorage
 * */
export function saveSettings() {
  try {
    const sanitized = validateSettings(settings);
    localStorage.setItem("snakeGameSettings", JSON.stringify(sanitized));
  } catch (err) {
    console.warn("Failed to save settings", err);
  }
}
