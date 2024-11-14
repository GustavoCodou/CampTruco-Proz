const express = require('express');
const router = express.Router();
const db = require('../db');
const { route } = require('./users');

const handleQuery = (res, method, query, params) => {
    db.query(query, params, (err, results) => {
        if (err) {
            res.status(500).json({ data: { success: false }, error: 'Erro ao executar a consulta!' });
            console.log(err)
            return
        }

        if (method === 'Login') {
            if (results.length > 0) {
                res.json({data: { success: true }});
            } else {
                res.json({data: { success: false }});
            }
        } else {
            res.json({data: { success: true, results: results }});
        }
    });
};

router.post('/login', (req, res) => {
    const { nome, senha } = req.body;
    console.log("Api Admin/login Used!", nome, senha);

    handleQuery(res, "Login", 'SELECT * FROM users WHERE (nome = ? AND senha = ? AND isAdmin = true)', [nome, senha])
});

module.exports = router;