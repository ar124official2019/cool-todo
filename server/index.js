const dotenv = require("dotenv");
dotenv.config({ path: "google.env" });

const { createServer } = require("http");
const express = require("express");
const cors = require("cors");
const session = require("express-session");
require("./config/passport");

const app = express();
const httpServer = createServer(app);

const AuthRouter = require("./routers/auth");
const TodoRouter = require("./routers/todo");
const { errorMiddleware } = require("./config/app");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

app.use(cookieParser("secret"));

app.use(
  session({
    secret: "secret",
  })
);

app.use(
  cors({
    credentials: true,
    origin: function (origin, callback) {
      const whitelist = [undefined, "http://localhost:4200"];
      if (whitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);
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
