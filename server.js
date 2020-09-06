const express = require("express");
const app = express();
const mongoose = require('mongoose');
const articlesRoute = require('./routes/articles');
const path = require('path');
require('dotenv/config');
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());
mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true}, ()=> {console.log("Connected to Database");})

const port = process.env.PORT || 5000;


if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
    
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.use('/articles', articlesRoute);

app.listen(port, () => console.log(`Listening on port ${port}`));






