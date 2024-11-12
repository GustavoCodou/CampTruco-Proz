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
      res.json({data: { results: results }});

      if (results) {
        console.log(results)
      }
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
  console.log(email, nome, senha)

  handleQuery(res, 'INSERT INTO users (email, nome, senha) VALUES (?, ?, ?)', [email, nome, senha])
});

router.get('/login', (req, res) => {
  if (req.query) {
    const { nome, senha } = req.query;
    console.log(nome, senha)
    handleQuery(res, 'SELECT * FROM users WHERE nome = ? AND senha = ?', [nome, senha])
  }
});

module.exports = router;
