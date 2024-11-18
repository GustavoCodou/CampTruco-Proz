const express = require('express');
const router = express.Router();
const db = require('../db');

const handleQuery = (res, query, params, callback) => {
    db.query(query, params, (err, results) => {
        if (err) {
            res.status(500).json({ data: { success: false }, error: 'Erro ao executar a consulta!' });
            console.log(err)
            return
        }
        callback(results)
    });
};

router.post('/login', (req, res) => {
    const { username, password } = req.body;

    handleQuery(res, "SELECT * FROM users WHERE (username = ? AND password = ? AND isAdmin = true)", [username, password], results => {
        console.log("API /login Usada!", username);

        if (results.length > 0) {
            res.json({ data: { success: true, message: 'Login bem-sucedido!' } });
        } else {
            res.json({ data: { success: false, message: 'Usuário ou senha inválidos!' } });
        }
    });
});

module.exports = router;