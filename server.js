const express = require("express");
const app = express();
const db = require("./db");
require('dotenv').config()

const bodyParser = require("body-parser");
app.use(bodyParser.json());


//import and use the router files
const personRoutes = require("./routes/personRoutes");
const menuItemsRoutes = require("./routes/menuItemsRoutes")
app.use("/person", personRoutes);
app.use("/menu", menuItemsRoutes)

app.get("/", (req, res) => {
  res.send("Hello! welocome to the hotel, how can i help you");
});

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log("App listening on port 3000");
});
