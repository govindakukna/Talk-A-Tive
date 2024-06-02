const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();
const db = require("./config/db");
const bodyParser = require('body-parser');
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
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
app.use("/api/message", messageRoutes);

// use to handle errors 
app.use(notFound);
app.use(errorHandler);

const server = app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
    // credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("Connected to socket.io");
  socket.on("setup", (userData) => {
    socket.join(userData?.id);
    //console.log("id",userData.id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room: " + room);
  });

 socket.on("typing", (room) => socket.in(room).emit("typing"));
 socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on('new message', (newMessageRecieved) => {
    var chat = newMessageRecieved?.chat;
   console.log("chat ",chat);
    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      // console.log("socket check", newMessageRecieved.sender);

      if (user._id == newMessageRecieved.sender._id) return;
      // console.log("socket check", newMessageRecieved);
      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
  });

  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });
});