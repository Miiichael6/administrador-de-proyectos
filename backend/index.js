const express = require("express");
const indexRouter = require("./routes/index.Routes");
const connectarDB = require("./config/db.js");
const cors = require("cors");

const { FRONTEND_URL } = process.env;

connectarDB();
const app = express();

app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", FRONTEND_URL);
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});
// ROUTING
app.use("/api", indexRouter);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Servidor is Running ☀ http://localhost:${PORT} ☀`);
});
