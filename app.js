const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const userRouter = require("./routes/userRouter");
const profileRouter = require("./routes/profileRouter");
const activityRouter = require("./routes/activityRouter");
const photoRouter = require("./routes/photoRouter");
const connectionsRouter = require("./routes/connectionsRouter");

const port = 3001;

const user = "Dieguein";
const password = "BhKqobNPA4tvsAvr";
const nameCollection = "FindYourPeople";
const url = `mongodb+srv://${user}:${password}@diego.wmp7dvz.mongodb.net/${nameCollection}?retryWrites=true&w=majority`;

mongoose.connect(url);

app.use(express.json());
app.use(cors());

app.use("/users", userRouter);
app.use("/profiles", profileRouter);
app.use("/activities", activityRouter);
app.use("/image", photoRouter);
app.use("/connections", connectionsRouter);

app.listen(port, () => {
  console.log("Runing server");
});
