import { pool } from "../config/db.js";

/**
 * @typedef {import("express").Request} Request
 * @typedef {import("express").Response} Response
 * */

/**
 * @typedef {Object} ScoreSubmission
 * @property {string} name
 * @property {number} score
 * */

/**
 * @param {Request} req
 * @param {Response} res
 * */
export async function getScores(req, res) {
  try {
    const [rows] = await pool.query(`
      SELECT name, score, created_at
      FROM scores
      WHERE deleted_at IS NULL
      ORDER BY score DESC
      LIMIT 20;
    `);

    res.json(rows);
  } catch (error) {
    console.error("Error fetching scores: ", error);

    res.status(500).json({ error: "Failed to fetch scores" });
  }
}

/**
 * @param {Request} req
 * @param {Response} res
 * */
export async function postScore(req, res) {
  /** @type {ScoreSubmission} */
  let { name, score } = req.body;

  // Data validation
  name = name?.trim();
  score = Number(score);

  if (!name || !Number.isInteger(score)) {
    return res.status(400).json({ error: "Invalid input" });
  }

  if (name.length > 30) {
    return res.status(400).json({ error: "Name is too long (30 chars max)" });
  }

  try {
    await pool.query("INSERT INTO scores (name, score) VALUES (?, ?)", [
      name.trim(),
      score,
    ]);

    res.status(201).json({ message: "Score saved" });
  } catch (error) {
    console.error("Error saving score: ", error);
    res.status(500).json({ error: "Failed to save score" });
  }
}
