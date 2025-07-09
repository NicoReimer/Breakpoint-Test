# Breakpoint Wiki

Ein kollaboratives Wiki-System zur Erstellung, Bearbeitung und Darstellung von Artikeln.  
Entwickelt als Software-Engineering-Projekt im 4. Semester Informatik.

---

## Diskussionen & Blog

Das Projekt nutzt GitHub Discussions zur Fortschrittsdokumentation und zum Peer Review.  
[Zum Discussion-Board](https://github.com/NicoReimer/Breakpoint/discussions)

## Features

- Login via Discord OAuth
- Multi-Page-Wiki-Editor mit Inhaltsverzeichnis
- Live-Vorschau und Wiki-Ansicht nach Inhaltsstruktur
- Kategorisierung von Wikis mit Icons und Filterfunktion
- Account Settings Page mit User-Daten
- Datenanbindung an Backend inkl. Base64-Images und JSON Content
- Responsive Design im Dashboard-Stil (React-basiert)

---

## Projektstruktur

```
src/
├── assets/
│   └── react.svg
├── components/
│   ├── Navbar.jsx
│   └── WikiCard.jsx
├── hooks/
│   └── useAuth.js
├── pages/
│   ├── CategoryPage.jsx
│   ├── Home.jsx
│   ├── NewWiki.jsx
│   ├── SearchResults.jsx
│   ├── Settings.jsx
│   ├── WikiEditor/
│   │   ├── WikiEditor.jsx
│   │   └── components/
│   │       ├── ComponentDrawer/
│   │       │   ├── ComponentDrawer.jsx
│   │       │   └── ComponentList.jsx
│   │       ├── ContentArea/
│   │       │   ├── ContentArea.jsx
│   │       │   ├── DraggableItem.jsx
│   │       │   └── DraggableItems.jsx
│   │       ├── DraggableComponents/
│   │       │   ├── ImageComponent.jsx
│   │       │   ├── TableComponent.jsx
│   │       │   └── TextComponent.jsx
│   │       └── TableOfContents/
│   │           ├── TableOfContents.jsx
│   │           └── TocList.jsx
│   └── WikiView/
│       ├── WikiView.jsx
│       └── components/
│           ├── ContentArea/
│           │   └── ContentArea.jsx
│           ├── DraggableComponents/
│           │   ├── ImageComponent.jsx
│           │   ├── TableComponent.jsx
│           │   └── TextComponent.jsx
│           └── TableOfContents/
│               ├── TableOfContents.jsx
│               └── TocList.jsx
├── App.css
├── App.jsx
├── index.css
└── main.jsx
```

---

## Projektdokumentation

Die vollständige technische und organisatorische Dokumentation befindet sich im separaten Repository:  
https://github.com/NicoReimer/Breakpoint/Docs

Dort enthalten:

- Handout (PDF)
- SRS (Software Requirement Specification)
- SAD (Software Architecture Document)
- Testbericht mit Screenshots
- Clean Code Refactoring Dokumentation
- RMMM – Risikoanalyse
- Technical Review Memo
- GitHub Discussions zur Projektkommunikation

---

## Verwendete Technologien

- **Frontend**: ReactJS, Vite, CSS Modules
- **Authentifizierung**: Discord OAuth2
- **Backend**: Express API (extern gehostet)
- **Datenhaltung**: MariaDB (Tabelle `pages` für Inhalte)
- **Tools**: GitHub, Visual Studio Code

---

## Team

- Dennis
- Nico
- Tim

---

## Testing und CI/CD

- Es wurden manuelle Tests durchgeführt – siehe Testbericht im Dokumentations-Repository
- Kein CI/CD-Workflow eingerichtet. Deployment erfolgte manuell zur Live-Demo

---

## Lokales Setup

```bash
git clone https://github.com/NicoReimer/Breakpoint-Test.git
cd breakpoint
npm install

# Backend starten
cd server
node index.js

# Frontend starten
cd src
npm run dev
# -> Link wird in Terminal angezeigt

---
```
