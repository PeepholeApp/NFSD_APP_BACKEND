const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const userRouter = require("./routes/userRouter");

const port = 3001;

const user = "Dieguein";
const password = "BhKqobNPA4tvsAvr";
const nameCollection = "FindYourPeople";
const url = `mongodb+srv://${user}:${password}@diego.wmp7dvz.mongodb.net/${nameCollection}?retryWrites=true&w=majority`;

mongoose.connect(url);

app.use(express.json());
app.use(cors());

app.use("/users", userRouter);

app.listen(port, () => {
  console.log("Runing server");
});
