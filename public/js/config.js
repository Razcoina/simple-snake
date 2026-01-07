const canvasEl = /** @type {HTMLCanvasElement} */ (
  document.getElementById("game")
);

if (!canvasEl) throw new Error("Canvas not found");

const ctxEl = canvasEl.getContext("2d");

if (!ctxEl) throw new Error("2D context not available");

export const config = {
  canvas: canvasEl,
  ctx: ctxEl,
  gameState: 0, // STATES: 0 = MENU, 1 = GAME, 2 = SCORE
  snakeColor: "green",
  gridLines: true,
  warpWalls: false,
  soundVolume: 80,
  soundMute: false,
  musicVolume: 80,
  musicMute: false,
  TILE_SIZE: 20,
};
