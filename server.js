// Get all the fonts from Google Fonts Developer API
// the private key is set in .env file
require('dotenv').config()
const request = require('request');

var express = require('express');
var app = express();
var path = require('path');

app.use(express.static(path.join(__dirname)));

// viewed at based directory http://localhost:8080/
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/getFontsObject', function (req, res) {
	request('https://www.googleapis.com/webfonts/v1/webfonts?key='+process.env.GOOGLE_FONTS_API_KEY+'&sort=popularity', {json:true}, (err1, res1, body1) => {
		if (err1) { return console.log(err1); }
		res.send(res1.body);
	});
});

app.listen(process.env.PORT || 8080);
