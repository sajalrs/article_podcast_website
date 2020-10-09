const express = require("express");
const app = express();
const mongoose = require('mongoose');
const articlesRoute = require('./routes/articles');
const path = require('path');
const bodyParser = require('body-parser');
const youtubeRoute = require('./routes/youtube')
const createRoute = require('./routes/create')
const podcastsRoute = require('./routes/podcasts')
const usersRoute = require('./routes/users')

require('dotenv/config');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true}, ()=> {console.log("Connected to Database");})

const port = process.env.PORT || 5000;



app.use('/articles', articlesRoute);
app.use('/youtube', youtubeRoute);
app.use('/create', createRoute);
app.use('/podcasts', podcastsRoute);
app.use('/auth', usersRoute);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
  
 
  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });

}


app.listen(port, () => console.log(`Listening on port ${port}`));






