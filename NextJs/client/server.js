const app = require("express")();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const next = require("next");
const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });

const nextHandler = nextApp.getRequestHandler();
let port = 3000;

io.on("connect", (socket) => {
    console.log("User Connected");
    socket.on('join', data => {
      socket.join(`${data._id}.${data.tokenCreated}`)
      console.log("User joined room");
    })
  
    socket.on('disconnect', ()=> {
      socket.disconnect();
      console.log("User Disconnected");
    })


});

nextApp.prepare().then(() => {
  app.set('socket-io', io);  
  app.all("*", (req, res) => {
    // req = {...req, socket: io};  
    return nextHandler(req, res);
  });


  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`Ready on http://localhost:${port}`);
  });
});
