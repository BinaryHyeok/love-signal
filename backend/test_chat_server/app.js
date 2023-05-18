const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  cors: {
    origin: "*",
  },
});

const sendTestMSg = () => {
  io.emit("res_msg", "서버측 테스트 메시지");
  console.log("테스트 메시지 발송");
};

// 구독 정보를 데이터베이스에 저장
const saveSubscriptionToDatabase = async (subscription) => {
  // const db = await getDatabase();
  // await db.collection("subscriptions").insertOne(subscription);
  // console.log("Subscription saved to database.");
};

/**
 * Rest API
 */
app.get("/", (req, res) => {
  res.send("Server Running");
});

app.post("/subscribe", async (req, res) => {
  const subscription = req.body;
  await saveSubscriptionToDatabase(subscription);
  res.json({
    message: "New subscription saved successfully.",
  });
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

  // setInterval(() => {
  //   io.emit("res_msg", {
  //     user: "Server Test",
  //     msg: "서버 테스트 메시지",
  //   });
  //   console.log("테스트 메시지 발송");
  // }, 30000);
});
