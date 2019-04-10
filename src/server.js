const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");

const app = express();

app.use(cors());

const server = require("http").Server(app);
const io = require("socket.io")(server);

io.on("connection", socket => {
  console.log("ok");
  socket.on("connectRoom", box => {
    socket.join(box);
  });
});

const uri =
  "mongodb+srv://agnsuporte:agnsuporte@cluster0-uo6in.mongodb.net/agndb?retryWrites=true";

/**
 * Lembrar de liberar o IP nas configurações para permitir o acesso.
 */
mongoose.connect(uri, { useNewUrlParser: true });

app.use((req, res, next) => {
  req.io = io;

  return next();
});

/**
 * .json()
 *  Permite o entendimento/retorno de formato JSON
 */
app.use(express.json());

/**
 * .urlencoded({extended: true})
 *  Permite trasanssões de/com arquivos
 */
app.use(express.urlencoded({ extended: true }));

app.use("/files", express.static(path.resolve(__dirname, "..", "tmp")));

app.use(require("./routes"));

server.listen(process.env.PORT || 3030);
