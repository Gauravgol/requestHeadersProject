// index.js
// where your node app starts

// init project
require('dotenv').config();
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint...
app.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API' });
});

app.get('/api/whoami',(req,res)=>{
  try {
    const remoteAddress = req.connection.remoteAddress;
    
    // If the remote address is in IPv6 format, extract the IPv4 part
    const ipv4Address = remoteAddress.includes("::ffff:") ? remoteAddress.split(":").pop() : remoteAddress;
    const Language = req.headers["accept-language"]; // Get the language preferences of the client
    const Software = req.headers["user-agent"]; // Get the user agen


    res.json({ ipaddress: ipv4Address ,language:Language,software:Software});
    
  } catch (error) {
    
  }
})

// listen for requests :)
var listener = app.listen(process.env.PORT || 7000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
