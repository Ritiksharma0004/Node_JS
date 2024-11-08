const express = require("express");
const router = express.Router();
const MenuItem = require("./../models/MenuItem");
const { route } = require("./personRoutes");

router.post("/", async (req, res) => {
  try {
    const data = req.body;

    const newItem = new MenuItem(data);

    const response = await newItem.save();
    console.log(`Item added`);
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: `Internal Server Error` });
  }
});

router.get("/", async (req, res) => {
  try {
    const data = await MenuItem.find();
    console.log(`Data fetch`);
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: `Internal Server Error` });
  }
});

router.get("/:tasteOrder", async (req, res) => {
  try {
    const tasteOrder = req.params.tasteOrder;
    if (
      tasteOrder == "sweet" ||
      tasteOrder == "spicy" ||
      tasteOrder == "sour"
    ) {
      const response = await MenuItem.find({ taste: tasteOrder });
      console.log(`Taste fetch`);
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: `Invalid taste` });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: `Internal Server Error` });
  }
});

router.put("/:id", async (req,res) => {
  try {
    
    const menuId = req.params.id;
    const updatedMenu = req.body;

    const response = await MenuItem.findByIdAndUpdate(menuId,updatedMenu, {
      new: true,
      runValidators: true
    })

    if(!menuId) {
      return res.status(404).json({error: "menuItem not found"});
    }

    console.log("menuItem updated");
    res.status(200).json(response);

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: `Internal Server Error` });
  }
});

router.delete("/:id", async (req,res) => {
  try {
    
    const menuId = req.params.id;

    const response = await MenuItem.findByIdAndDelete(menuId);

    if(!menuId) {
      return res.status(404).json({error: "menuItem not found"});
    }

    console.log("menuItem deleted");
    res.status(200).json(response);

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: `Internal Server Error` });
  }
})

module.exports = router;
