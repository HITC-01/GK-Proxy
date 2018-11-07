const express = require('express');
const httpProxy = require('http-proxy');
const port = 3000;

const apiProxy = httpProxy.createProxyServer();
const serverOne = 'http://localhost:3001';  //serves user profile
const serverTwo = 'http://localhost:3003';  //serves user comments
// const serverThree = 'http://localhost:3002'; //serves track description
// const serverFour = 'http://localhost:3004'; //serves related player

const app = express();

app.use('/songs/:songId',express.static('./public'));

app.all("/user/:songId", function(req, res) {
 console.log('redirecting to Server1');
 apiProxy.web(req, res, {target: serverOne});
});

app.all("/api/sc/songs/:songId", function(req, res) {
 console.log('redirecting to Server2');
 apiProxy.web(req, res, {target: serverTwo});
});

// app.all("/nearbyhomes", function(req, res) {
//  console.log('redirecting to Server3');
//  apiProxy.web(req, res, {target: serverThree});
// });

// app.all("/images/:houseID", function(req, res) {
//  console.log('redirecting to Server4');
//  apiProxy.web(req, res, {target: serverFour});
// });

app.listen(port, () => {
 console.log(`listening at ${port}`);
});