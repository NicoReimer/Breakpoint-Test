const express = require('express');
const router = express.Router();
const db = require('../config/db');

console.log("✅ Articles-Routes wurden geladen");

// Artikel abrufen (inkl. Suche)
router.get('/', (req, res) => {
  const search = req.query.search;

  if (search) {
    const sql = 'SELECT * FROM articles WHERE title LIKE ? ORDER BY created_at DESC';
    db.query(sql, [`%${search}%`], (err, results) => {
      if (err) return res.status(500).json({ error: err });
      return res.json(results);
    });
  } else {
    console.log("➡ GET /api/articles wurde aufgerufen");
    db.query('SELECT * FROM articles ORDER BY created_at DESC', (err, results) => {
      if (err) return res.status(500).json({ error: err });
      res.json(results);
    });
  }
});

// Artikel erstellen
router.post('/', (req, res) => {
  const { title, author_id, category, images } = req.body;

  if (!title) {
    return res.status(400).json({ error: 'Title ist ein Pflichtfeld.' });
  }

  const sql = 'INSERT INTO articles (title, author_id, category, images, views) VALUES (?, ?, ?, ?, 0)';
  db.query(sql, [title, author_id, category, images], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ id: result.insertId });
  });
});

// Views erhöhen
router.post('/:id/view', (req, res) => {
  const articleId = req.params.id;
  const sql = 'UPDATE articles SET views = views + 1 WHERE id = ?';
  db.query(sql, [articleId], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.status(200).json({ message: 'Views erhöht' });
  });
});

module.exports = router;
