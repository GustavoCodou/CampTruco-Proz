const express = require('express');
const router = express.Router();
const db = require('../db');

const handleQuery = (res, query, params) => {
  db.query(query, params, (err, results) => {
      if (err) {
          res.status(500).json({data: { success: false }, error: 'Erro ao executar a consulta!'});
          console.log(err)
          return
      }
      res.json({data: { success: true, results: results }});
  });
};

router.get('/', async (req, res) => {
  if (req.query) {
    handleQuery(res, "SELECT * FROM users WHERE nome = ?, senha = ?", [req.query.nome, req.query.senha])
  }

  handleQuery(res, "SELECT * FROM users", [])
});

router.get('/:id', (req, res) => {
  handleQuery(res, "SELECT * FROM users WHERE id = ?", [req.params.id])
});

router.put('/:id', (req, res) => {
  const { email, nome, senha } = req.body;
  handleQuery(res, 'UPDATE users SET nome = ?, email = ?, senha = ? WHERE id = ?', [email, nome, senha, req.params.id])
});

router.delete('/:id', (req, res) => {
  handleQuery(res, 'DELETE FROM users WHERE id = ?', [req.params.id])
});

router.post('/register', (req, res) => {
  const { email, nome, senha } = req.body;
  console.log("Api /register Used!", email, nome, senha);

  handleQuery(res, 'INSERT INTO users (email, nome, senha) VALUES (?, ?, ?)', [email, nome, senha])
});

router.post('/login', (req, res) => {
  const { nome, senha } = req.body;
  console.log("Api /login Used!", nome, senha);

  db.query('SELECT * FROM users WHERE nome = ? AND senha = ?', [nome, senha], (err, results) => {
      if (err) {
          return res.status(500).json({data: { success: false }, error: 'Erro ao executar a consulta!'});
      }
      if (results.length > 0) {
          res.json({data: { success: true }});
      } else {
          res.json({data: { success: false }});
      }
  })
});

module.exports = router;
