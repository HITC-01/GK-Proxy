const express = require('express');
const httpProxy = require('http-proxy');
const port = 3000;

const apiProxy = httpProxy.createProxyServer();
const serverOne = 'http://ec2-13-57-241-194.us-west-1.compute.amazonaws.com';  //serves user profile
const serverTwo = 'http://ec2-54-185-4-172.us-west-2.compute.amazonaws.com/';  //serves user comments
const serverThree = 'http://ec2-54-215-217-201.us-west-1.compute.amazonaws.com/'; //serves related tracks
const serverFour = 'http://ec2-18-222-200-123.us-east-2.compute.amazonaws.com/'; //serves the sound cloud player

const app = express();

app.use('/songs/:songId',express.static('./public'));

app.all("/user/*", function(req, res) {
 console.log('redirecting to Server1');
 apiProxy.web(req, res, {target: serverOne});
});

app.all("/comments/*", function(req, res) {
 console.log('redirecting to Server2');
 apiProxy.web(req, res, {target: serverTwo});
});

app.all("/related/*", function(req, res) {
 console.log('redirecting to Server3');
 apiProxy.web(req, res, {target: serverThree});
});


app.all("/player/*", function(req, res) {
 console.log('redirecting to Server4');
 apiProxy.web(req, res, {target: serverFour});
});

app.listen(port, () => {
 console.log(`listening at ${port}`);
});