const express = require("express");
const app = express();
const mongoose = require('mongoose');
const articlesRoute = require('./routes/articles');
require('dotenv/config');
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());
mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true}, ()=> {console.log("Connected to Database");})

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));

app.use('/articles', articlesRoute);




