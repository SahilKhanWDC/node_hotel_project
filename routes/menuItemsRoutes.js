const express = require("express");
const router = express.Router();
const MenuItem = require("./../models/MenuItem");


//post method data bhejne k liye
//for both person and menuitems

router.post("/", async (req, res) => {
    try {
      const data = req.body;
  
      const newMenu = new MenuItem(data);
  
      const response = await newMenu.save();
      console.log("data saved");
      res.status(200).json(response);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "internal server error" });
    }
  });
  
  //now get method data lene k liye
  // for both person and menuitems
  
  router.get("/", async (req, res) => {
    try {
      const data = await MenuItem.find();
      console.log("data fetched succesfully");
      res.status(200).json(data);
    } catch {
      console.log(err);
      res.status(500).json({ error: "internal server error" });
    }
  });
  


module.exports = router;