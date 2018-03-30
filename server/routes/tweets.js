
const COOKIE_USER = 'user';
const userHelper    = require("../lib/util/user-helper");
const express       = require('express');
const tweetsRoutes  = express.Router();
const bcrypt = require('bcrypt');
const cookieSession = require('cookie-session');

tweetsRoutes.use(cookieSession({
  name: 'session',
  secret: 'secret',
  maxAge: 24 * 60 * 60 * 1000
}));



module.exports = function(DataHelpers) {
  tweetsRoutes.get("/", function(req, res) {
    const user = req.session[COOKIE_USER];
    DataHelpers.getTweets((err, tweets) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json({tweets, user});
      }
    });
  });


  tweetsRoutes.post('/login', function(req, res){
    let email = req.body.email;
    let password = req.body.password;
    DataHelpers.getUser(email, (error, user) => {
      if(user && bcrypt.compareSync(password, user.passwordHash)){
        req.session[COOKIE_USER] = user;
        res.redirect('/');
      } else {
        res.redirect('/');
      }
    });
  });

  tweetsRoutes.post('/logout', (req, res) => {
    req.session = null;
    console.log("BYE");
    res.redirect('/tweets');
  });

  tweetsRoutes.post("/", function(req, res) {
    if (!req.body.loggedInUser) {
      res.status(400).json({ error: 'invalid request: no data in POST body'});
      return;
    }

    DataHelpers.getUser(req.body.loggedInUser.email, (err, result) => {
      const user = result;
      const tweet = {
        user: user,
        content: {
          text: req.body.tweet
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


  });



  tweetsRoutes.post('/register', (req, res) => {
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let email = req.body.email;
    let password = req.body.password;

    let user = userHelper.generateRandomUser(firstName, lastName, email, password);

    if (!email || !password) {
      res.statusCode = 400;
      res.send('Empty email or password');
    } else {
      DataHelpers.addUser(user, (err) => {
        if(err){
          console.log(err.errmsg);
          res.redirect('/');
        } else {
          console.log("success");
          req.session[COOKIE_USER] = user;
          res.redirect('/');
        }
      });
    }
  });
  return tweetsRoutes;
};
