const express = require('express');
const models = require('./models');
const app = express();

app.get('/', (req, res) => {
  res.json({ success: true });
});

app.listen(3000);
