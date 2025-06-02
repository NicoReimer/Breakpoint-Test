require('dotenv').config();
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const DiscordStrategy = require('passport-discord').Strategy;
const cors = require('cors');

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());

// Discord OAuth Setup
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

passport.use(new DiscordStrategy({
  clientID: process.env.DISCORD_CLIENT_ID,
  clientSecret: process.env.DISCORD_CLIENT_SECRET,
  callbackURL: process.env.DISCORD_CALLBACK_URL,
  scope: ['identify', 'email']
}, (accessToken, refreshToken, profile, done) => {
  return done(null, profile);
}));

// Routes
app.get('/auth/discord', passport.authenticate('discord'));

app.get('/auth/discord/callback',
  passport.authenticate('discord', { failureRedirect: '/' }),
  (req, res) => {
    // Nach erfolgreichem Login: zurück zum Frontend
    res.redirect('http://localhost:5173');
  });

app.get('/auth/user', (req, res) => {
  res.json(req.user || null);
});

app.get('/auth/logout', (req, res) => {
  req.logout(() => {
    res.redirect('http://localhost:5173');
  });
});

// Server starten
app.listen(3001, () => {
  console.log('✅ Auth-Server läuft auf http://localhost:3001');
});
