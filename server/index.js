const { createServer } = require("http");
const express = require("express");
const cors = require("cors");
require("./config/passport");

const app = express();
const httpServer = createServer(app);

const AuthRouter = require("./routers/auth");
const TodoRouter = require("./routers/todo");
const { errorMiddleware } = require("./config/app");
const bodyParser = require("body-parser");

app.use(cors());
app.options("*", cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/api/v1/auth", AuthRouter);
app.use("/api/v1/todo", TodoRouter);
app.use(errorMiddleware);

httpServer.listen(3000);
httpServer.on("listening", () => {
  console.info("Server is listening at port: 3000");
});
