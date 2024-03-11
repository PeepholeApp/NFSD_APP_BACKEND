require("dotenv").config();

const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const cors = require("cors");
const socketIO = require("socket.io");

const userRouter = require("./routes/userRouter");
const profileRouter = require("./routes/profileRouter");
const activityRouter = require("./routes/activityRouter");
const photoRouter = require("./routes/photoRouter");
const chatRouter = require("./routes/chatRouter");
const messagesRouter = require("./routes/messagesRouter");
const connectionsRouter = require("./routes/connectionsRouter");
const resetPasswordRouter = require("./routes/ResetPasswordRouter");

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const port = process.env.PORT || 3001;

const user = process.env.MONGODB_USER;
const password = process.env.MONGODB_PASSWORD;
const nameCollection = process.env.MONGODB_NAMECOLLECTION;

const url = `mongodb+srv://${user}:${password}@diego.wmp7dvz.mongodb.net/${nameCollection}?retryWrites=true&w=majority`;

mongoose.connect(url);

app.use(express.json());
app.use(cors());

app.use("/users", userRouter);
app.use("/profiles", profileRouter);
app.use("/activities", activityRouter);
app.use("/image", photoRouter);
app.use("/connections", connectionsRouter);
app.use("/reset-password", resetPasswordRouter);
app.use("/chats", chatRouter);
app.use("/messages", messagesRouter);

io.on("connection", (socket) => {
  console.log("User connected");

  socket.on("chat-message", (message) => {

    io.emit("chat-message", message);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});


server.listen(process.env.PORT || `0.0.0.0:${port}`, () => {
  console.log("Running server");
});
