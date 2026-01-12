const express = require("express");
const router = express.Router();
const User = require("../modals/user.js");

// Pending teachers
router.get("/teachers/pending", async (req, res) => {
  try {
    const teachers = await User.find({
      role: "teacher",
      status: "pending",
    }).select(
      "fullName email gender country teacherProfile"
    );

    res.json(teachers);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});
router.patch("/users/:id/approve", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.status = "approved";
    await user.save();

    res.json({ message: "User approved" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Reject user
router.delete("/users/:id/reject", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User rejected and removed" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});
router.get("/teachers/approved", async (req, res) => {
  const teachers = await User.find({
    role: "teacher",
    status: "approved",
  });
  res.json(teachers);
});
router.get("/users/status/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("status role");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});
module.exports = router;
