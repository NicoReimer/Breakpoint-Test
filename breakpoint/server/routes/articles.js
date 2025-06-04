// server/routes/articles.js
const express = require("express");
const router = express.Router();
const db = require("../config/db");

console.log("✅ Articles-Routes wurden geladen");

// Artikel abrufen (inkl. Suche)
router.get("/", (req, res) => {
  const search = req.query.search;

  if (search) {
    const sql =
      "SELECT * FROM articles WHERE title LIKE ? ORDER BY created_at DESC";
    db.query(sql, [`%${search}%`], (err, results) => {
      if (err) {
        console.error("❌ Fehler bei Suche:", err);
        return res.status(500).json({ error: err });
      }
      return res.json(results);
    });
  } else {
    console.log("➡ GET /api/articles wurde aufgerufen");
    db.query(
      "SELECT * FROM articles ORDER BY created_at DESC",
      (err, results) => {
        if (err) {
          console.error("❌ Fehler bei Query:", err);
          return res.status(500).json({ error: err });
        }
        res.json(results);
      }
    );
  }
});

// Beliebteste Wikis (Top 8 nach Views)
router.get("/popular", (req, res) => {
  const sql = "SELECT id, title, image_url AS image, views FROM articles ORDER BY views DESC LIMIT 8";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Fehler bei /popular:", err);
      return res.status(500).json({ error: "Serverfehler" });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "Keine Artikel gefunden." });
    }

    res.json(results);
  });
});

// Artikel + erste Seite abrufen
router.get("/:id", (req, res) => {
  const { id } = req.params;

  const wikiTitleSql = "SELECT title FROM articles WHERE id = ?";
  db.query(wikiTitleSql, [id], (wikiErr, wikiResult) => {
    if (wikiErr) {
      console.error("❌ Fehler beim Abrufen des Artikels:", wikiErr);
      return res
        .status(500)
        .json({ error: "Fehler beim Abrufen des Artikels." });
    }

    if (wikiResult.length === 0) {
      return res.status(404).json({ error: "Artikel nicht gefunden." });
    }

    const title = wikiResult[0].title;

    const firstPageSql =
      "SELECT title FROM pages WHERE wikiID = ? ORDER BY tocID ASC LIMIT 1";
    db.query(firstPageSql, [id], (pageErr, pageResult) => {
      if (pageErr) {
        console.error("❌ Fehler beim Abrufen der Seite:", pageErr);
        return res
          .status(500)
          .json({ error: "Fehler beim Abrufen der Seite." });
      }

      const firstPageTitle = pageResult.length > 0 ? pageResult[0].title : null;

      res.json({
        title,
        firstPageTitle,
        wikiID: parseInt(id),
      });
    });
  });
});

router.get("/category/:category", (req, res) => {
  const { category } = req.params;
  const sql =
    "SELECT id, title, image_url AS image, views FROM articles WHERE category = ?";
  db.query(sql, [category], (err, results) => {
    if (err) {
      console.error("❌ Fehler beim Abrufen nach Kategorie:", err);
      return res.status(500).json({ error: err });
    }
    res.json(results);
  });
});


// Artikel erstellen

const defaultImage = require("./defaultImage");

router.post("/", (req, res) => {
  const { title, author_id, category, image_url, description } = req.body;

  if (!title) {
    return res.status(400).json({ error: "Title ist ein Pflichtfeld." });
  }

  const finalImageUrl = image_url || defaultImage;

  const sql =
    "INSERT INTO articles (title, author_id, category, image_url, description, views) VALUES (?, ?, ?, ?, ?, 0)";
  db.query(
    sql,
    [title, author_id, category, finalImageUrl, description],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });

      const newWikiId = result.insertId;

      const pageSql =
        "INSERT INTO pages (wikiID, tocID, title) VALUES (?, 0, 'Home')";
      db.query(pageSql, [newWikiId], (pageErr) => {
        if (pageErr) {
          console.error("❌ Fehler beim Erstellen der Startseite:", pageErr);
          return res.status(500).json({ error: pageErr });
        }

        res.status(201).json({ id: result.insertId });
      });
    }
  );
});

// Views erhöhen
router.post("/:id/view", (req, res) => {
  const articleId = req.params.id;
  const sql = "UPDATE articles SET views = views + 1 WHERE id = ?";
  db.query(sql, [articleId], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.status(200).json({ message: "Views erhöht" });
  });
});

module.exports = router;
