const express = require("express");
// const bp = require("body-parser");
const router = require("./Routes/router");

const app = express();
app.use(express.json());
app.use("/", router);

const port = process.env.port || 3000;

app.listen(port, () => {
  console.log(`Application listening on port ${port}...`);
});
