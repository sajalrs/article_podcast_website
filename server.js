const express = require("express");
const app = express();
const mongoose = require('mongoose');
const articlesRoute = require('./routes/articles');
const youtubeRoute = require('./routes/youtube')
const createRoute = require('./routes/create')
const path = require('path');
const bodyParser = require('body-parser');

require('dotenv/config');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true}, ()=> {console.log("Connected to Database");})

const port = process.env.PORT || 5000;



app.use('/articles', articlesRoute);
app.use('/youtube', youtubeRoute);
app.use('/create', createRoute);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
  
 
  // app.get('/*', (req, res) => {
  //   res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  // });

  app.get('/.well-known/pki-validation/C3701E4D57417E8F8AB5A18E30D23FC4.txt', (req, res)=> {
    res.sendFile(path.join(__dirname, './', 'C3701E4D57417E8F8AB5A18E30D23FC4.txt'))
  });
}


app.listen(port, () => console.log(`Listening on port ${port}`));






