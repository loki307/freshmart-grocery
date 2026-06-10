const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
const db = mysql.createConnection({
  host: 'grocery-db.c16wmm4mcwhv.ap-south-1.rds.amazonaws.com',
  user: 'admin',
  password: 'poco-x3-pro',
  database: 'grocerydb'
});
db.connect(function(err) {
  if (err) { console.log('DB Error:', err); return; }
  console.log('DB Connected!');
});
app.get('/api/products', function(req, res) {
  db.query('SELECT * FROM products', function(err, results) {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});
app.post('/api/orders', function(req, res) {
  db.query('INSERT INTO orders (user_id, total) VALUES (?, ?)', [req.body.user_id, req.body.total], function(err, result) {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Order placed!' });
  });
});
app.post('/api/register', function(req, res) {
  db.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [req.body.name, req.body.email, req.body.password], function(err, result) {
    if (err) return res.status(400).json({ error: 'Email exists' });
    res.json({ message: 'Registered!' });
  });
});
app.get('/health', function(req, res) {
  res.json({ status: 'OK' });
});
app.listen(3000, function() {
  console.log('Server running on port 3000');
});
