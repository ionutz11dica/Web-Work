const express = require('express'),
path = require('path'),
bodyParser = require('body-parser'),
cors = require('cors'),
mongoose = require('mongoose');

const app = express();
app.use(bodyParser.json());
app.use(cors());
let port = process.env.PORT || 4000;

app.use(express.static(path.join(__dirname, "/")));

app.get('/', function (req, res) {
  console.log(path.join(__dirname,'/src/index.html'))
  res.sendFile(path.join(__dirname,'/src/index.html'))
});

app.get("/cucurigu", (req,res) => {
  res.status(200).json("BAUBAUBAUABBA")
});

const server = app.listen(port, function(){
    console.log('Listening on port ' + port);
});