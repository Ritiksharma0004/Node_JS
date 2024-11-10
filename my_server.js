const express = require("express");
const app = express();
app.use(express.json());
const db = require("./db.js");
require("dotenv").config();
const passport = require("./auth.js")






// Middleware Function
const logRequest = (req,res,next) => {
  console.log(`[${new Date().toLocaleString()}] Request made to: ${req.originalUrl}`)
  next();
}
app.use(logRequest);



//Authentication part
app.use(passport.initialize());

const localAuthMiddleware = passport.authenticate('local', {session: false});

app.get("/", (req, res) => {
  res.send("Connect to database");
});


//  Import Router files

const personRoutes = require("./routes/personRoutes.js");
const menuRoutes = require("./routes/menuRoutes.js");
const PORT = process.env.PORT || 3000;

// Use the routers
app.use("/person",localAuthMiddleware,  personRoutes);
app.use("/menuItem", menuRoutes);



app.listen(PORT, () => {
  console.log("server created");
});