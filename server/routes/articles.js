const express = require('express');
const router = express.Router();
const db = require('../config/db');

console.log("✅ Articles-Routes wurden geladen");
// Alle Artikel abrufen
router.get('/', (req, res) => {
  console.log("➡ GET /api/articles wurde aufgerufen");
  db.query('SELECT * FROM articles ORDER BY created_at DESC', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});


// Artikel erstellen
router.post('/', (req, res) => {
  const { title, content, author_id, category } = req.body;

  if (!title || !content) {
    return res.status(400).json({ error: 'Title und Content sind Pflichtfelder.' });
  }

  const sql = 'INSERT INTO articles (title, content, author_id, category) VALUES (?, ?, ?, ?)';
  db.query(sql, [title, content, author_id, category], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ id: result.insertId });
  });
});

module.exports = router;
