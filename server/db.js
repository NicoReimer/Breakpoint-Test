const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'breakuser',
  password: 'breakpass123',
  database: 'breakpoint_db'
});

connection.connect(err => {
  if (err) {
    console.error('❌ Fehler bei DB-Verbindung:', err);
  } else {
    console.log('✅ Verbunden mit MariaDB');
  }
});

module.exports = connection;
