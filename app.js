const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const userRouter = require("./routes/userRouter");
const profileRouter = require("./routes/profileRouter");
const activityRouter = require("./routes/activityRouter");
const photoRouter = require("./routes/photoRouter");
const chatRouter = require("./routes/chatRouter");
const connectionsRouter = require("./routes/connectionsRouter");
const resetPasswordRouter = require("./routes/ResetPasswordRouter");



const user = "Dieguein";
const password = "BhKqobNPA4tvsAvr";
const nameCollection = "FindYourPeople";

const dotenv = require("dotenv").config();

const port = 3001;

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
app.use("/chat", chatRouter);
app.use("/connections", connectionsRouter);
app.use("/users", userRouter);
app.use("/profiles", profileRouter);
app.use("/activities", activityRouter);
app.use("/image", photoRouter);
app.use("/chat", chatRouter);
app.use("/connections", connectionsRouter);
app.use("/reset-password", resetPasswordRouter); 



app.listen(3001, () => {

app.listen(port, () => {
  console.log("Running server");
});


  console.log("Runing server");
});

