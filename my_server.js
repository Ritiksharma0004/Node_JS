const express = require("express");
const app = express();
app.use(express.json());
const db = require("./db.js");

app.get("/", (req, res) => {
  res.send("Connect to database");
});

//  Import Router files

const personRoutes = require("./routes/personRoutes.js");
const menuRoutes = require("./routes/menuRoutes.js");

// Use the routers
app.use("/person", personRoutes);
app.use("/menuItem", menuRoutes);

app.listen(3000, () => {
  console.log("server created");
});