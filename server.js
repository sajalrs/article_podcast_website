const express = require("express");
const app = express();
const mongoose = require('mongoose');
const articlesRoute = require('./routes/articles');
const youtubeRoute = require('./routes/youtube')
const path = require('path');
const bodyParser = require('body-parser');

require('dotenv/config');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true}, ()=> {console.log("Connected to Database");})

const port = process.env.PORT || 5000;


if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
    
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.use('/articles', articlesRoute);
app.use('/youtube', youtubeRoute);

app.listen(port, () => console.log(`Listening on port ${port}`));






