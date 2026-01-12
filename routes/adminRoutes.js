const express = require("express");
const router = express.Router();
const User = require("../modals/user.js");

// Pending teachers
router.get("/teachers/pending", async (req, res) => {
  try {
    const teachers = await User.find({
      role: "teacher",
      status: "pending",
    }).select("fullName email country");

    res.json(teachers);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
