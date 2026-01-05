import { pool } from "../config/db.js";

/**
 * @typedef {import("express").Request} Request
 * @typedef {import("express").Response} Response
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
  let { name, score } = req.body;

  name = name?.trim();
  score = Number(score);

  // Data validation
  if (!name || !Number.isInteger(score)) {
    return res.status(400).json({ error: "Invalid input" });
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
