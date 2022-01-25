const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const routes = require("./routes");

dotenv.config();
const { sequelize } = require("./models");

const app = express();
app.set("PORT", process.env.PORT || 8080);
sequelize
  .sync()
  .then(() => {
    console.log("DB 연결 성공");
  })
  .catch(console.error);

app.use(morgan("dev"));
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api", routes);

const server = app.listen(app.get("PORT"), () => {
  console.log(`listening on port ${app.get("PORT")}`);
});
