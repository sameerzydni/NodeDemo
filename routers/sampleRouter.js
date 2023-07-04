const express = require("express");
const router = express.Router();
const sampleModel = require("../models/sampleModel");
const multer = require("multer");
const upload = multer();

// [GET]
router.get("/", async (req, res) => {
  try {
    const contact = await sampleModel.find();
    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// [GET: {ID}]
router.get("/:id", async (req, res) => {
  try {
    const contact = await sampleModel.findById(req.params.id);
    if (contact) {
      res.json(contact);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    res.status(500).json({ message: "Please enter valid ID" });
  }
});

// [POST]
router.post("/", upload.none(), async (req, res) => {
  const requiredFields = [
    { name: "FullName", message: "FullName field is required." },
    { name: "Email", message: "Email field is required." },
    { name: "ContactNo", message: "ContactNo field is required." },
    { name: "CompanyName", message: "CompanyName field is required." },
    { name: "City", message: "City field is required." },
    { name: "Country", message: "Country field is required." },
    { name: "Message", message: "Message field is required." },
  ];

  // Check if any required fields are missing or empty
  for (const field of requiredFields) {
    if (!req.body[field.name]) {
      return res.status(400).send(field.message);
    }
  }

  const postAbout = new sampleModel({
    FullName: req.body.FullName,
    Email: req.body.Email,
    Email: req.body.Email,
    ContactNo: req.body.ContactNo,
    CompanyName: req.body.CompanyName,
    City: req.body.City,
    Country: req.body.Country,
    Message: req.body.Message,
  });

  try {
    const contact = await postAbout.save();
    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// [PATCH]
router.patch("/:id", upload.none(), async (req, res) => {
  const { id } = req.params;

  const updateFields = {};

  // Check if any fields are present in the request body and update the corresponding fields in updateFields object
  if (req.body.Name) {
    updateFields.Name = req.body.Name;
  }

  if (req.body.Email) {
    updateFields.Email = req.body.Email;
  }

  if (req.body.ContactNo) {
    updateFields.ContactNo = req.body.ContactNo;
  }

  if (req.body.CompanyName) {
    updateFields.CompanyName = req.body.CompanyName;
  }

  if (req.body.City) {
    updateFields.City = req.body.City;
  }

  if (req.body.Country) {
    updateFields.Country = req.body.Country;
  }

  if (req.body.Message) {
    updateFields.Message = req.body.Message;
  }

  if (req.body.Status) {
    updateFields.Status = req.body.Status;
  }

  try {
    const updatedAbout = await sampleModel.findByIdAndUpdate(id, updateFields, {
      new: true,
    });
    res.json(updatedAbout);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// [Delete]
router.delete("/:id", async (req, res) => {
  try {
    const contact = await sampleModel.findById(req.params.id);
    if (contact) {
      const deleteAbout = await contact.deleteOne();
      res.json(deleteAbout);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    res.sendStatus(404, "Please enter valid ID");
  }
});

module.exports = router;
