const express = require('express');
const bodyParser = require('body-parser');
const models = require('./models');
const bcrypt = require('bcrypt');

const saltRounds = 10;
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.json({ success: true });
});

app.post('/signup', (req, res) => {
  // get username and password
  const username = req.body.username;
  const password = req.body.password;

  // hash password using bcrypt
  bcrypt.hash(password, saltRounds, (err, hash) => {
    // create new user with username and hashed password
    models.User.create({ username, encryptedPassword: hash }).then(() => {
      res.json({ success: true });
    });
  });
});

app.post('/login', (req, res) => {
  // get username and password
  // hash password
  // compare hashed password with encrypted password in database
  // if they are the same return token to user
});

app.get('/secret-route', (req, res) => {
  // check for token in header
  // if token is valid, then return the data
});

app.listen(3000);
