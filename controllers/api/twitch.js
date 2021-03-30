const router = require('express').Router();
const fetch = require('node-fetch')
require('dotenv').config()
const client = process.env.twitch_client;
const auth = process.env.twitch_auth;

router.get('/topGames', (req, res) => {
  console.log('hello')
  let apiUrl = 'https://api.twitch.tv/helix/games/top';
  fetch(apiUrl, {
    method: "GET",
    headers: {
      "Client-ID": client,
      "Authorization": auth
    }
  }).then(function(data) {
    console.log('line 37', data)
    return data.json()
  })
  .then(function(data) {
    res.json(data)
  })
  .catch(err => {
      res.status(500).json(err);
  });
});

router.get('/:title', (req, res) => {
  let title = req.params.title;
  let apiUrl = 'https://api.twitch.tv/helix/games?name=' + title;
  fetch(apiUrl, {
    method: "GET",
    headers: {
      "Client-ID": client,
      "Authorization": auth
    }
  }).then(function(data) {
    return data.json()
  })
  .then(function(data) {
    res.json(data)
  })
  .catch(err => {
      res.status(500).json(err);
  });
});

module.exports = router;