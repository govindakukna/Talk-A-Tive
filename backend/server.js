const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();
const db = require("./config/db");
const bodyParser = require('body-parser');
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const { notFound, errorHandler } = require("./middleWare/errorMiddleware");


app.use(bodyParser.json());
app.use(cors());

const chats = require("./data");


const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("API is running Succesfully");
});

app.use("/api/user", userRoutes);
app.use("/api/chat",chatRoutes);

// use to handle errors 
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
