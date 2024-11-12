const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/', async (req, res) => {
  const { userId, equipeId } = req.body;
  try {
    const [result] = await db.execute('INSERT INTO players (userId, equipeId) VALUES (?, ?)', [userId, equipeId]);
    res.status(201).json({ message: 'Jogador criado com sucesso', playerId: result.insertId });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar jogador' });
  }
});

router.get('/', async (req, res) => {
  try {
    const [players] = await db.execute('SELECT * FROM players');
    res.json(players);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar jogadores' });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [players] = await db.execute('SELECT * FROM players WHERE id = ?', [id]);
    if (players.length > 0) {
      res.json(players[0]);
    } else {
      res.status(404).json({ error: 'Jogador não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao encontrar jogador' });
  }
});

module.exports = router;
