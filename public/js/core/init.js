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
  tickrate: 200,

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

  // If the game is paused
  paused: false,

  // Prevent double turns
  inputQueue: [],
};

// User settings
// TODO: fetch user settings from localStorage
export const settings = {
  snakeColor: "green",
  gridLines: true,
  warpWalls: false,
  soundVolume: 80,
  soundMute: false,
  musicVolume: 80,
  musicMute: false,
  showFPS: true,
};
