import verify from "../verification/verifyToken.js";

const handler = (req, res) => {
  try {
    // try {
    //   const io = req.app.get("socketio");
    //   io.sockets
    //     .in(`${req.user._id}.${req.user.tokenCreated}`)
    //     .emit("logged out", { msg: "User logged out" });
    //   console.log("User left room");
    // } catch (error) {
    //   console.log(error);
    // }

    // res.setHeader(
    //   "Set-Cookie",
    //   serialize(
    //     "token",
    //     {},
    //     { path: "/" },
    //     { httpOnly: true},
    //     {expires: Date.now() }
    //   )
    // );

    res
      .setHeader(
        "Set-Cookie",
        "token=deleted; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
      )
      .then(res.json({ token: token }));
  } catch (err) {
    res.send(err);
  }
};

export default verify(handler);
