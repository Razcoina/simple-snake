import { engine, STATES } from "../core/init.js";
import { drawButton } from "../utils/draw.js";
import { input } from "../utils/input.js";

let menuState = {
  currentMenu: "main", // main, play, settings, highscores
  selectedIndex: 0,
};

const menus = {
  main: [
    { label: "Play", action: () => (menuState.currentMenu = "play") },
    { label: "Settings", action: () => (menuState.currentMenu = "settings") },
    {
      label: "Highscores",
      action: () => (menuState.currentMenu = "highscores"),
    },
  ],

  play: [
    {
      label: "Easy",
      action: () => {
        engine.difficulty = "easy";
        engine.gameState = STATES.GAME;
      },
    },
    {
      label: "Medium",
      action: () => {
        engine.difficulty = "medium";
        engine.gameState = STATES.GAME;
      },
    },
    {
      label: "Hard",
      action: () => {
        engine.difficulty = "hard";
        engine.gameState = STATES.GAME;
      },
    },
    {
      label: "Insane",
      action: () => {
        engine.difficulty = "insane";
        engine.gameState = STATES.GAME;
      },
    },
    {
      label: "Back",
      action: () => {
        menuState.currentMenu = "main";
        menuState.selectedIndex = 0;
      },
    },
  ],

  settings: [
    // Design this properly later
    { label: "Music Volume" },
    { label: "Sound Volume" },
    { label: "Gridlines On/Off" },
    { label: "Snake Color" },
    { label: "Warp Walls" },
    { label: "Show FPS" },
    {
      label: "Back",
      action: () => {
        menuState.currentMenu = "main";
        menuState.selectedIndex = 1;
      },
    },
  ],

  highscores: [
    { label: "Top 20 Scores" }, // can render a table here
    {
      label: "Back",
      action: () => {
        menuState.currentMenu = "main";
        menuState.selectedIndex = 0;
      },
    },
  ],
};

export const updateMenu = () => {
  // e.g., handle menu navigation
};

export function renderMenu() {
  const ctx = engine.ctx;

  ctx.clearRect(0, 0, engine.canvas.width, engine.canvas.height);
}
