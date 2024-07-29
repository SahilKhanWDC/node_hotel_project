const express = require("express");
const router = express.Router();
const Person = require("./../models/Person");

//post method for person
router.post("/", async (req, res) => {
  try {
    const data = req.body;

    const newperson = new Person(data);

    const response = await newperson.save();
    console.log("data saved");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "internal server error" });
  }
});

// get method for person
router.get("/", async (req, res) => {
  try {
    const data = await Person.find();
    console.log("data fetched succesfully");
    res.status(200).json(data);
  } catch {
    console.log(err);
    res.status(500).json({ error: "internal server error" });
  }
});

//parameterised api call
router.get("/:workType", async (req, res) => {
  try {
    const workType = req.params.workType;

    if (workType == "chef" || workType == "waiter" || workType == "manager") {
      const response = await Person.find({ work: workType });
      console.log("response fetched");
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "Invalid work type" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "internal server error" });
  }
});

//put request to update any object
router.put("/:id", async (req, res) => {
  try {
    const personId = req.params.id;
    const updatedPersonData =  req.body

    const response = await Person.findByIdAndUpdate(
        personId,
        updatedPersonData,
        {
          new: true,
          runValidators: true,
        }
      );

    if (!response) {
        res.status(404).json({error: "Person not found"})
    }

    console.log("data updated");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "internal server error" });
  }
});

module.exports = router;
