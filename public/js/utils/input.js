import { engine } from "../core/init.js";

export const input = {
  keys: new Set(),

  /**
   * @param {string} key
   * */
  isDown(key) {
    return this.keys.has(key);
  },

  clear() {
    this.keys.clear();
  },
};

engine.canvas.addEventListener("keydown", (event) => {
  input.keys.add(event.key);

  // prevent scrolling with arrows and space
  if (
    ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "].includes(event.key)
  ) {
    event.preventDefault();
  }
});

engine.canvas.addEventListener("keyup", (event) => {
  input.keys.delete(event.key);
});

engine.canvas.addEventListener("blur", () => {
  input.keys.clear();
});

engine.canvas.addEventListener("click", () => engine.canvas.focus());
