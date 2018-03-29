
const userHelper    = require("../lib/util/user-helper")

const express       = require('express');
const tweetsRoutes  = express.Router();
const bcrypt = require('bcrypt');
const cookieSession = require('cookie-session');

tweetsRoutes.use(cookieSession({
  name: 'session',
  secret: 'secret',
  maxAge: 24 * 60 * 60 * 1000
}));

function generateRandomString(length){
  let randomString = '';
  let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < length; i++) {
    let randomNumber = Math.floor(Math.random() * chars.length);
    randomString += chars.charAt(randomNumber);
  }
  return randomString;
}

module.exports = function(DataHelpers) {

  tweetsRoutes.get("/", function(req, res) {
    DataHelpers.getTweets((err, tweets) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json(tweets);
      }
    });
  });

  tweetsRoutes.post("/", function(req, res) {
    if (!req.body.text) {
      res.status(400).json({ error: 'invalid request: no data in POST body'});
      return;
    }

    const user = req.body.user ? req.body.user : userHelper.generateRandomUser('test@test.test', 'asdgsagsa');
    const tweet = {
      user: user,
      content: {
        text: req.body.text
      },
      created_at: Date.now()
    };

    DataHelpers.saveTweet(tweet, (err) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(201).send();
      }
    });
  });

  tweetsRoutes.post('/login', function(req, res){
    let email = req.body.email;
    let password = req.body.password;
    console.log(email);
    console.log(password);
  });

  tweetsRoutes.post('/register', (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    let user = userHelper.generateRandomUser(email, password);

    if (!email || !password) {
      res.statusCode = 400;
      res.send('Empty email or password');
    } else {
      DataHelpers.addUser(user, (err) => {
        if(err){
          console.log(err);
        } else {
          console.log("REDIRECT");
          res.redirect('/');
        }
      });

    }
  });

  return tweetsRoutes;
};
