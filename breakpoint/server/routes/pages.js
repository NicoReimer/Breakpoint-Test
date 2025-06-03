const express = require("express");
const router = express.Router();
const db = require("../config/db");

// GET /api/pages/:wikiID
router.get("/:wikiID", (req, res) => {
  const { wikiID } = req.params;
  const sql = "SELECT * FROM pages WHERE wikiID = ? ORDER BY tocID ASC";
  db.query(sql, [wikiID], (err, results) => {
    if (err) {
      console.error("❌ Fehler beim Abrufen der Seiten:", err);
      return res.status(500).json({ error: err });
    }
    res.json(results);
  });
});

// PUT /api/pages/:wikiId
router.put("/:wikiId/:tocId", (req, res) => {
  const { wikiId, tocId } = req.params;
  const { content, sections } = req.body;
  const fullContent = JSON.stringify({ content, sections });

  const sql = "UPDATE pages SET content = ? WHERE wikiID = ? AND tocID = ?";
  db.query(sql, [fullContent, wikiId, tocId], (err, result) => {
    if (err) {
      console.error("❌ Fehler beim Speichern:", err);
      return res.status(500).json({ error: err });
    }
    res.json({ message: "Gespeichert" });
  });
});

module.exports = router;
