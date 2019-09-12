const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const models = require('./models');

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
  const username = req.body.username;
  const password = req.body.password;

  models.User.findOne({ where: { username }}).then((user) => {
    const encryptedPassword = user.dataValues.encryptedPassword;

    // if they are the same return token to user
    bcrypt.compare(password, encryptedPassword, (err, result) => {
      if (result) {
        const token = jwt.sign({ username }, 'supersecret', { expiresIn: 1200000 });
        res.send({ token });
      } else {
        res.json({ success: false });
      }
    });
  });
});


app.get('/secret-route', (req, res) => {
  // check for token in header
  const token = req.headers.authorization;

  // if token is valid, then return the data
  jwt.verify(token, 'supersecret', (err, decoded) => {
    if (decoded) {
      res.json({ message: 'Secret message' })
    }
  });
});

app.listen(3000);
