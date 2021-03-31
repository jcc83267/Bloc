const router = require('express').Router();
const fetch = require('node-fetch')
require('dotenv').config()
const client = process.env.twitch_client;
const auth = process.env.twitch_auth;
const secret = process.env.twitch_secret

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

// router.get('/login', (req, res) => {
//   let title = req.params.title;
//   let apiUrl = `https://id.twitch.tv/oauth2/authorize?client_id=${client}&redirect_uri=http://localhost:3001/&response_type=code&scope=user:read:email&state=`;
//   fetch(apiUrl, {
//     method: "GET",
//     headers: {
//       "Client-ID": client,
//       "Authorization": auth
//     }
//   }).then(fetch)
//   let code = urlParams.get('code')
//   let apiUrl2= `https://id.twitch.tv/oauth2/token?client_id=${client}&client_secret=${secret}&code=${code}&grant_type=authorization_code&redirect_uri=http://localhost:3001/`
//   console.log(code)
//   fetch(apiUrl2, {
//     method: "POST",
//     headers: {
//       "Client-ID": client,
//       "Cilennt-Secret": secret,
//       "Code": code
//     }
//   // .then(function(data) {
//   //   console.log("ssssssssseeeeerrr==================================================", data)
//   //   res.json(data)
    
//   //   console.log(code)
//   // })
//   // .catch(err => {
//   //     res.status(500).json(err);
//   // });
// });

// router.post('/login/:code=',(req,res) =>{
  
// })


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