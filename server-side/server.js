const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const usersSrc = require('./src/users');
const playersSrc = require('./src/players');

app.use('/api/users', usersSrc);
app.use('/api/players', playersSrc);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});