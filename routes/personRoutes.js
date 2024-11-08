const express = require("express");
const router = express.Router();
const Person = require("./../models/Person");

router.post("/", async (req, res) => {
  try {
    const data = req.body;

    const newPerson = new Person(data);

    const response = await newPerson.save();
    console.log("Data saved");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: `Internal Server Error` });
  }
});

router.get("/", async (req, res) => {
  try {
    const data = await Person.find();
    console.log(`Data fetch`);
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: `Internal Server Error` });
  }
});

router.get("/:workType", async (req, res) => {
  try {
    const workType = req.params.workType;
    if (workType == "chef" || workType == "waiter" || workType == "manager") {
      const response = await Person.find({ work: workType });
      console.log("response fetch");
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: `Invalid workType` });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: `Internal Server Error` });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const personId = req.params.id;
    const updatedPersonData = req.body;

    const response = await Person.findByIdAndUpdate( personId,updatedPersonData,{
        new: true,
        runValidators: true,
      }
    );

    if (!response) {
      return res.status(404).json({ error: "Person not found" });
    }

    console.log("data updated");
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: `Internal Server Error` });
  }
});

router.delete("/:id", async(req,res)=> {
  try {
    const personId = req.params.id;

    const response = await Person.findByIdAndDelete(personId);
    if (!response) {
      return res.status(404).json({ error: "Person not found" });
    }
    console.log(`person_id: ${personId} deleted` );
    res.status(200).json({message: "person deleted sucessfully"});
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: `Internal Server Error` });
  }
})

module.exports = router;
