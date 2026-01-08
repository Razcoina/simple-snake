import { engine, STATES } from "../core/init.js";

const menuItems = [
  { label: "Play", action: () => (engine.gameState = STATES.GAME) },
  { label: "Settings", action: () => console.log("Settings") },
  { label: "High Scores", action: () => console.log("High Scores") },
];

let selectedIndex = 0;

export const updateMenu = () => {
  // e.g., handle menu navigation
};

export function renderMenu() {
  const ctx = engine.ctx;

  ctx.clearRect(0, 0, engine.canvas.width, engine.canvas.height);

  ctx.font = "24px monospace";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  menuItems.forEach((item, i) => {
    ctx.fillStyle = i === selectedIndex ? "#6cf2a2" : "#9aa5a0";
    ctx.fillText(item.label, engine.canvas.width / 2, 200 + i * 40);
  });
}
