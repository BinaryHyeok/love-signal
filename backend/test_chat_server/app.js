const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  cors: {
    origin: "*",
  },
});

app.get("/", (req, res) => {
  res.send("Server Running");
});

http.listen(5000, () => {
  console.log("Connected at port 5000");
});

io.on("connection", (socket) => {
  socket.on("req_msg", (msg) => {
    console.log("msg : " + msg);
    io.emit("res_msg", msg);
  });

  // socket.on("res_msg", () => {
  //   console.log()
  // })

  socket.on("disconnect", async () => {
    console.log("socket disconnected");
  });
});
