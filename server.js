const express = require("express");
const app = express();
const mongoose = require("mongoose");
const articlesRoute = require("./routes/articles");
const path = require("path");
const bodyParser = require("body-parser");
const youtubeRoute = require("./routes/youtube");
const createRoute = require("./routes/create");
const podcastsRoute = require("./routes/podcasts");
const usersRoute = require("./routes/auth");
const messagesRoute = require("./routes/messages");
const cookieParser = require("cookie-parser");
const csrf = require("csurf");
const http = require("http").Server(app);
const io = require("socket.io")(http);

require("dotenv/config");
const csrfProtection = csrf({ cookie: true });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(csrfProtection);
mongoose.connect(
  process.env.MONGO_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to Database");
  }
);

const port = process.env.PORT || 5000;

app.use("/articles", articlesRoute);
app.use("/youtube", youtubeRoute);
app.use("/create", createRoute);
app.use("/podcasts", podcastsRoute);
app.use("/auth", usersRoute);
app.use("/messages", messagesRoute);

app.get("/csrf-token", (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));

  app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

http.listen(port, () => console.log(`Listening on port ${port}`));
app.set("socketio", io);


io.on("connection", (socket) => {
  console.log("User Connected");

  socket.on('join', data => {
    socket.join(data._id)
  })

  socket.on('disconnect', ()=> {
    socket.disconnect();
    console.log("User Disconnected");
  })


});
